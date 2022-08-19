 
import AppHelper from "../lib/app-helper";

import { ControllerMethod, AssertionResponse, Route } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import AttachedImageController, { FileValidation } from "./AttachedImageController";
 
import ExtensibleDB from 'extensible-mongoose'
  
import { createRecord, deleteRecord, findRecord, findRecordById, findRecords } from "../lib/mongo-helper";
import APIController, { InternalMethod, MongoRecord } from "./APIController"; 
  
import { escapeString, mongoIdToString, stringToMongoId, unescapeString } from "../lib/parse-helper";
 

import { DigitalAsset, DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import UserSessionController from "./UserSessionController";

export default class DigitalAssetController extends APIController {

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
        
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)
       
        if(!validatedSession){
            return {success:false,error:"requires validated session"}
        }

        let parentUserId =validatedSession.userId
 
 
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



    getDigitalAssets: ControllerMethod = async (req:any )=> {
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)

        let parentUserId = mongoIdToString(validatedSession._id)
        

        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
            {parentThreadId:'string'})

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data
        
        const {parentThreadId} = sanitizedData


      
        let matchingResponse = await findRecords( {parentThreadId}, DigitalAssetDefinition, this.mongoDB )

       
        if(!matchingResponse.success) return matchingResponse


        let outputArray = await Promise.all(matchingResponse.data.map( x => DigitalAssetController.getDigitalAssetRenderData( x , this.mongoDB)))

        return {success:true, data: outputArray}
    }




    insertNewDigitalAsset:InternalMethod = async ( 
        {parentUserId,title,contractAddress,primaryTokenId,metadataURI}:
        {parentUserId:string,title:string,contractAddress:string,primaryTokenId:string, metadataURI: string } ) => {
    
        const currentTime = Date.now().toString()

        let insertionData:DigitalAsset  = {
            parentUserId,
            title, 
            creator: "XCOPY",
            networkName: "mainnet",

            contractAddress,
            primaryTokenId,
            metadataURI,
            

            createdAt: currentTime,
            updatedAt: currentTime,

            status: 'pending'
        }

       return await createRecord( insertionData, DigitalAssetDefinition, this.mongoDB  )
 
    }
 

 
    static async getDigitalAssetRenderData(digitalAsset:DigitalAsset & MongoRecord,  mongoDB: ExtensibleDB ){

        
        let digitalAssetId = mongoIdToString( digitalAsset._id ) 

        return {
            digitalAssetId,
            title: unescapeString(digitalAsset.title),
            description: unescapeString(digitalAsset.description) 
        }
    }
  

}