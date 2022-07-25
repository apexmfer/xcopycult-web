 
import AppHelper from "../lib/app-helper";

import { ControllerMethod, AssertionResponse, Route } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import AttachedImageController, { FileValidation } from "./AttachedImageController";
 
import ExtensibleDB from 'extensible-mongoose'
  
import { createRecord, deleteRecord, findRecord, findRecordById, findRecords } from "../lib/mongo-helper";
import APIController, { InternalMethod } from "./APIController"; 
  
import { escapeString, mongoIdToString, stringToMongoId, unescapeString } from "../lib/parse-helper";
import { Endpoint, EndpointDefinition, Slug, SlugDefinition } from "../dbextensions/EndpointDBExtension";
 
import crypto from 'crypto'
import EndpointController from "./EndpointController";

export default class SlugController extends APIController {

    getControllerName() : string {
        return 'slug'
    }


    getRoutes() : Route[] {
        return [
            {"type":"get","uri":"/:slug","method":"resolveSlug","controller":this.getControllerName()},
            
            {"type":"post","uri":"/slug/create","method":"createSlug","controller":this.getControllerName()}
    
        ]
    }
  
    resolveSlug: ControllerMethod = async (req:any ) => {

        

        let slug = APIHelper.sanitizeInput( req.query.slug , 'string[]')
        
        let matchingSlugResponse = await findRecord( {slug}, SlugDefinition, this.mongoDB )
        
        if(!matchingSlugResponse.success) return matchingSlugResponse

        let matchingSlug = matchingSlugResponse.data

      
        let matchingEndpointResponse = await findRecordById( matchingSlug.parentEndpointId,EndpointDefinition, this.mongoDB )
      
        if(!matchingEndpointResponse.success) return matchingEndpointResponse
        
        let matchingEndpoint = matchingEndpointResponse.data 

        let redirectURL = await EndpointController.getRedirectURLForEndpoint( matchingEndpoint, this.mongoDB )

 


        return   {success:true, data: {url: redirectURL }, specialAction:"redirect"} 


    }
    createSlug: ControllerMethod = async (req:any )=> {
        

        let validation = APIHelper.validateExists(["parentEndpointId"], req.fields)
        if(!validation.success) return validation

        

        
        let parentEndpointId = APIHelper.sanitizeInput(req.fields.parentEndpointId, 'string')

        let insertResponse = await this.insertNewSlug( parentEndpointId )
 

        if(!insertResponse.success) return   insertResponse
        
 
      
        return insertResponse  
    }


    insertNewSlug:InternalMethod = async ( parentEndpointId:string ) => {
    
        let insertionData:Slug  = {
            uuid: SlugController.generateRandomUUID(),
            parentEndpointId, 
            status: 'active'
        }

       return await createRecord( insertionData, SlugDefinition, this.mongoDB  )
 
    }

    static generateRandomUUID(){

        return crypto.randomBytes(12).toString('hex');
    }

 
    static async getSlugRenderData(slug:Slug,  mongoDB: ExtensibleDB ){

        let slugId = mongoIdToString( slug._id ) 

        return {
            slugId,
            uuid: slug.uuid,
        }
    }
  

}