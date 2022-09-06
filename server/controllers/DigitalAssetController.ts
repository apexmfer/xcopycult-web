 
import AppHelper from "../lib/app-helper";

import { ControllerMethod, AssertionResponse, Route } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import AttachedImageController, { FileValidation } from "./AttachedImageController";
 
import ExtensibleDB from 'extensible-mongoose'
  
import { createRecord, deleteRecord, findRecord, findRecordById, findRecords, findRecordsWithOptions, getRecordCount, modifyRecord } from "../lib/mongo-helper";
import APIController, { InternalMethod, MongoRecord } from "./APIController"; 
  
import { escapeString, mongoIdToString, stringToMongoId, unescapeString } from "../lib/parse-helper";
 

import { DigitalAsset, DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import UserSessionController from "./UserSessionController";
import { AttachedImageDefinition } from "../dbextensions/ImageDBExtension";

export default class DigitalAssetController extends APIController {


    constructor(public mongoDB:ExtensibleDB, public userSessionController:UserSessionController){
        super(mongoDB);
    }



    getControllerName() : string {
        return 'digitalasset'
    }


    getRoutes() : Route[] {
        return [
           // {"type":"get","uri":"/:slug","method":"resolveSlug","controller":this.getControllerName()},
            
            {"type":"post","uri":"/post/create","method":"createPost","controller":this.getControllerName()}
    
        ]
    }
  
    
    createDigitalAsset: ControllerMethod = async (req:any )=> {
        
        let validatedSession = await this.userSessionController.validateSessionTokenParam(req)
       

        console.log({validatedSession})
        
        if(!validatedSession.success){
            return {success:false,error:"requires validated session"}
        }

        let parentUserId = validatedSession.data.userId
 
 
        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
             {title:'string',
             contractAddress:'string',
             primaryTokenId: 'string',
             metadataURI: 'string' })

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data

        
        const {title,contractAddress,primaryTokenId,metadataURI} = sanitizedData


        let insertResponse = await this.insertNewDigitalAsset(
             {parentUserId,
                title,
                contractAddress,
                primaryTokenId,
                metadataURI} )
 

        if(!insertResponse.success) return   insertResponse
        
        return insertResponse  
    }
 

    getDigitalAsset: ControllerMethod = async (req:any )=> {
       
        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
            {digitalAssetId:'string'})

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data
        
        const {digitalAssetId} = sanitizedData

        let matchingResponse = await findRecordById( digitalAssetId, DigitalAssetDefinition, this.mongoDB )
       
        if(!matchingResponse.success) return matchingResponse
            
        let outputData = await DigitalAssetController.getDigitalAssetRenderData( matchingResponse.data , 'primary', this.mongoDB)
        
        return {success:true, data: outputData}
    }


    getDigitalAssets: ControllerMethod = async (req:any )=> {
       
        if(!req.fields.offset) req.fields.offset = '0'
        if(!req.fields.limit) req.fields.limit = '50'
        if(!req.fields.status) req.fields.status = 'active'


        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
            {offset:'number', limit:'number', status:'string'})

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data
        
        let {offset,status,limit} = sanitizedData

        if(isNaN(limit) || limit > 50){
            limit = 50
        }

        let matchingResponse = await findRecordsWithOptions( { status }, {limit, offset}, DigitalAssetDefinition, this.mongoDB )
        
        if(!matchingResponse.success) return matchingResponse

        let matchingCountResponse = await getRecordCount({ status },DigitalAssetDefinition,this.mongoDB)
        if(!matchingCountResponse.success) return matchingCountResponse

        let matchingCount = matchingCountResponse.data
        //let outputArray = await Promise.all(matchingResponse.data.map( x => DigitalAssetController.getDigitalAssetRenderData( x , this.mongoDB)))

        let outputArray:any[] = []

        for(let data of matchingResponse.data){
            try{
            let renderData = await DigitalAssetController.getDigitalAssetRenderData( data , 'thumbnail', this.mongoDB)
            outputArray.push(renderData)
            }catch(e){
                console.error(e)
            }
        }

        return {success:true, data: {digitalAssets:outputArray,count:matchingCount}}
    }




    insertNewDigitalAsset:InternalMethod = async ( 
        {parentUserId,title,contractAddress,primaryTokenId,metadataURI,localMedia,mediaAttribute,mediaType}:
        {parentUserId:string,title:string,contractAddress:string,primaryTokenId:string, metadataURI: string, localMedia:string, mediaAttribute:string, mediaType:string } ) => {
    
        const currentTime = Date.now().toString()

        let insertionData:DigitalAsset  = {
            parentUserId,
            title, 
            creator: "XCOPY",
            networkName: "mainnet",

            contractAddress,
            primaryTokenId,
            metadataURI,

            mediaAttribute,
            mediaType,
            localMedia,
            

            createdAt: currentTime,
            updatedAt: currentTime,

            status: 'pending'
        }

       return await createRecord( insertionData, DigitalAssetDefinition, this.mongoDB  )
 
    }

    updateDigitalAsset:InternalMethod = async ({assetId, modifyParams}:{assetId:string, modifyParams:any}) => {
 
        return await modifyRecord( assetId, modifyParams, DigitalAssetDefinition, this.mongoDB   )
    }
 

 
    static async getDigitalAssetRenderData(
        digitalAsset:DigitalAsset & MongoRecord, 
        tagname: string | undefined,
         mongoDB: ExtensibleDB ){   

        if(!tagname){
            tagname = 'thumbnail'
        }

        
        let digitalAssetId = mongoIdToString( digitalAsset._id ) 

        let primaryAttachedImageResponse = await findRecord({
            parentId:digitalAssetId,
            parentType:'digitalasset',
            tagname
        },AttachedImageDefinition,  mongoDB)

        let primaryAttachedImage = primaryAttachedImageResponse.data 

        let imageData 
        
        if(primaryAttachedImage){
         imageData = await AttachedImageController.getAttachedImageRenderData(primaryAttachedImage)
        }
        return {
            digitalAssetId,
            title: unescapeString(digitalAsset.title),
            description: unescapeString(digitalAsset.description),
            imageData,
            metadataURI: digitalAsset.metadataURI,
            contractAddress: digitalAsset.contractAddress,
            status: digitalAsset.status

        }
    }
  

}