
 
 
import AppHelper from "../lib/app-helper";

import { AssertionResponse, ControllerMethod, Route } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import APIController from "./APIController" 
import AttachedImageController, { FileValidation } from "./AttachedImageController";

import ExtensibleDB from 'extensible-mongoose'
import { Category, CategoryDefinition } from "../dbextensions/CategoryDBExtension";
import { createRecord, deleteRecord, findRecordById, findRecords } from "../lib/mongo-helper";
 
import { escapeString, mongoIdToString, unescapeString } from "../lib/parse-helper";
 export default class CategoryController extends APIController {
 

 
    getRoutes() : Route[] {
        return [
           
         //   {"type":"post","uri":"/post/create","method":"createPost","controller":this.getControllerName()}
    
        ]
    }



    getControllerName() : string {
        return 'category'
    }

    getCategories: ControllerMethod = async (req: any ) => {
 

        /*  if(!req.fields || !req.fields.publicAddress){
            return   {success:false, error: 'Missing publicAddress' } 
        }
            
        */

        //can find by adminAddress 
         
        let categoryArrayResponse = await findRecords({  }, CategoryDefinition , this.mongoDB ) 


        let outputArray = categoryArrayResponse.data 
 

        let data = await Promise.all(outputArray.map(item => CategoryController.getCategoryRenderData(item, this.mongoDB)))
 

        return   {success:true, data } 
       
    }

    getCategory: ControllerMethod = async (req: any ) => {

        console.log('getCategory',req.fields)


        if(!req.fields || !req.fields.shopId){
            return   {success:false, error: 'Missing projectId' } 
        }

 
        let categoryId = APIHelper.sanitizeInput(req.fields.categoryId,'string') 
        
 
        let categoryResponse = await findRecordById( categoryId , CategoryDefinition, this.mongoDB)
 

        if(!categoryResponse.success){
            return  categoryResponse
        }


        let category = categoryResponse.data
 
      
        let data = await CategoryController.getCategoryRenderData(category,this.mongoDB) 

 
        return   {success:true, data }

    }


    //will require [degen] auth token to prove pub address (pre hook)
    createCategory: ControllerMethod = async (req:any )=> {
 
        if(!req.fields.name){
            return {success:false, error: 'Missing name' }  
        }

        let categoryName = APIHelper.sanitizeInput( req.fields.name.toLowerCase(), 'string' ) 
       
        let insertCategoryResponse = await CategoryController.insertNewCategory(  {name:categoryName} , this.mongoDB)

        if(!insertCategoryResponse.success){ 
            return insertCategoryResponse
        }
 
       
        return insertCategoryResponse 
       

    }


    editCategory: ControllerMethod = async (req:any ) => {

        console.log('edit shop', req.fields )

        return {success:true}
    } 



    static async insertNewCategory({name}:{name:string}, mongoDB: ExtensibleDB):
     Promise<AssertionResponse>{
         
        let inputData:Category  = {
            name:  escapeString(name.toLowerCase()),
            urlSlug: APIHelper.buildSlug(name),
            colorCodeHex: APIHelper.getRandomColorHex()
        }
 

       return await createRecord( inputData, CategoryDefinition, mongoDB  )
    }
 

  
    static async getCategoryRenderData(category:any,  mongoDB: ExtensibleDB ){

        let categoryId = mongoIdToString( category._id ) 

        return {
            name: unescapeString(category.name),
            urlSlug: unescapeString(category.urlSlug),
            categoryId, 
             
           // threads: await ProjectController.getChildEndpointsData(projectId, mongoDB)  
        }
    }
  

 



}