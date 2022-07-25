 
import AppHelper from "../lib/app-helper";

import { ControllerMethod, AssertionResponse } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import AttachedImageController, { FileValidation } from "./AttachedImageController";
 
import ExtensibleDB from 'extensible-mongoose'
 
import PricingManager from "../segmentmanagers/PricingManager";
import { createRecord, deleteRecord, findRecordById, findRecords } from "../lib/mongo-helper";
import APIController from "./APIController";
import { PurchaseableDefinition } from "../dbextensions/PurchaseableDBExtension";
import { Product, ProductAttributeDefinition, ProductDefinition } from "../dbextensions/ProductDBExtension";
import PurchaseableController from "./PurchaseableController";
import ShopController from "./ShopController";
import { ShopDefinition } from "../dbextensions/ProjectDBExtension";
import { escapeString, mongoIdToString, stringToMongoId, unescapeString } from "../lib/parse-helper";
import ProductAttributeController from "./ProductAttributeController";

export default class ProductController extends APIController {

 
 
    
    getProduct: ControllerMethod = async (req:any) => {

       

        let productId = APIHelper.sanitizeInput( req.fields.productId , 'string')
        

        let productResponse = await findRecordById( productId , ProductDefinition, this.mongoDB)

        if(!productResponse.success){
            return productResponse
        }

        let item = productResponse.data
      

        let itemData = await ProductController.getProductRenderData(item, this.mongoDB)
      
        return   {success:true, data: itemData}


    }

    getProducts: ControllerMethod = async (req:any ) => {

        

        let productIds = APIHelper.sanitizeInput( req.fields.productIds , 'string[]')
         
        let adminAddress = APIHelper.sanitizeInput(req.fields.adminAddress, 'publicaddress')  
 

        let query = {} 
 
        if(productIds){
            let mongoItemIds: string[] =  productIds.filter(x => typeof x != 'undefined').map(x => stringToMongoId(x))

            query['_id'] = {$in: mongoItemIds} 
        }
        
        if(adminAddress){

            let shopRecordsResponse = await findRecords({adminAddress},ShopDefinition,this.mongoDB)
            let shops = shopRecordsResponse.data 
            let shopIds = shops.map( x => x._id )

            console.log('shopIds',shopIds)
            query['parentShopId'] = {$in: shopIds} 

             

            //do a join with parentShopId to find ?? 
        }
 

        let productsResponse = await findRecords( query , ProductDefinition , this.mongoDB)

        if(!productsResponse.success){
            return productsResponse
        }
      
        let productsData = await Promise.all(productsResponse.data.map( 
             x => {return  ProductController.getProductRenderData(x,this.mongoDB)}))
 
        return   {success:true, data: productsData} 


    }

/*
    getMyProducts: ControllerMethod = async (req:any ) => {

        if(!req.fields || !req.fields.publicAddress){
            return   {success:false, error: 'Missing publicAddress' } 
        }

        let publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress, 'publicaddress')  

        let productsResponse = await findRecords( { buyerAddress: publicAddress  }, ProductDefinition, this.mongoDB)

        if(!productsResponse.success){
            return productsResponse
        }
      
        let productsData = await Promise.all(productsResponse.data.map( 
             x => {return  ProductController.getProductRenderData(x,this.mongoDB)}))
 
        return   {success:true, data: productsData}


    }*/


    createProduct: ControllerMethod = async (req:any ) => {
 

        if(!req.fields.name){
            return   {success:false, error: 'Missing name' }  
        }

        if(!req.fields.publicAddress){
            return {success:false, error: 'Missing publicAddress' }  
        }


        let name = APIHelper.sanitizeInput(req.fields.name ,'string')
        let publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress, 'publicaddress')
        let parentShopId = APIHelper.sanitizeInput( req.fields.parentShopId ,'string')
     //   let priceUsdCents = APIHelper.sanitizeInput( req.fields.priceCents,' number') 


        let attachedImageIds = APIHelper.sanitizeInput(req.fields.attachImages, 'json_string[]')
         

        let insertionResponse = await ProductController.insertNewProduct( 
            {name , 
            parentShopId },
            this.mongoDB)

        if(!insertionResponse.success){
            console.log('could not insert')
            return   {success:false, error: 'Could not insert new product' }  
        }

        let insertedItemId = mongoIdToString( insertionResponse.data._id)



        if(attachedImageIds && attachedImageIds.length > 0){
            for(let imageId of attachedImageIds){

                let attachResponse =  await AttachedImageController.attachImage( imageId, 
                    'product', insertedItemId, publicAddress, this.mongoDB  )
                
                if(!attachResponse.success){ 

                    await deleteRecord(insertedItemId, ProductDefinition, this.mongoDB  )
                    return attachResponse
                }
            }
        }
           


   

        return  insertionResponse
       

    }

    static async insertNewProduct(
        {name, parentShopId }:
        {name:string, parentShopId:string },
        mongoDB: ExtensibleDB): Promise<AssertionResponse>{

        
        name = escapeString(name.toLowerCase())

        let productData:Product  = {
            name,
            urlSlug: APIHelper.buildSlug(name),
    
            parentShopId: parentShopId,
         //   priceUsdCents,
            status: 'active'
        }
 
  

       return await createRecord( productData, ProductDefinition, mongoDB  )


    

    }

 
 
    static async getProductRenderData(productRecord:any, mongoDB: ExtensibleDB){


        let productId = mongoIdToString( productRecord._id )


        return {
            name: unescapeString(productRecord.name) , 
            productId,
            parentShopId: productRecord.parentShopId,
            purchaseables: await ProductController.getChildPurchaseablesData(productId, mongoDB),
            productAttributes: await ProductController.getChildProductAttributesData(productId, mongoDB),
            images: await AttachedImageController.getAttachedImagesData('product',productId,mongoDB), 
         //   priceEthGwei: PricingManager.calculatePriceEthGwei(productRecord.priceUsdCents,'UsdCents', mongoDB), 
        }
    }
 

    

    static async getChildPurchaseablesData(parentProductId:string, mongoDB: ExtensibleDB ){
     
        let itemsListResponse = await findRecords({parentProductId},PurchaseableDefinition,mongoDB)

        let itemsList = itemsListResponse.data 

        return await Promise.all(itemsList.map(  x => {return PurchaseableController.getPurchaseableRenderData(x,mongoDB)}))
   
    }
  



    static async getChildProductAttributesData(parentProductId:string, mongoDB: ExtensibleDB ){
     
        let itemsListResponse = await findRecords({parentProductId},ProductAttributeDefinition,mongoDB)

        let itemsList = itemsListResponse.data 

        return await Promise.all(itemsList.map(  x => {return ProductAttributeController.getProductAttributeRenderData(x,mongoDB)}))
   
    }
  
    static async getOwnerOfProduct(productId: string, mongoDB: ExtensibleDB): Promise<AssertionResponse> {
        
        let productRecordResult = await findRecordById(productId, ProductDefinition, mongoDB)

        if(!productRecordResult.success){
            return productRecordResult            
        }

        let product = productRecordResult.data 
        
        let shopId = product.parentShopId

        return await ShopController.getOwnerOfShop( shopId, mongoDB   )
    }
     


}