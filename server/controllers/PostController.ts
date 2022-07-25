 
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
import EndpointController from "./ThreadController";
import UserSessionController from "./UserSessionController";
import { Post, PostDefinition } from "../dbextensions/ThreadDBExtension";

export default class PostController extends APIController {

    getControllerName() : string {
        return 'post'
    }


    getRoutes() : Route[] {
        return [
           // {"type":"get","uri":"/:slug","method":"resolveSlug","controller":this.getControllerName()},
            
            {"type":"post","uri":"/post/create","method":"createPost","controller":this.getControllerName()}
    
        ]
    }
  
    
    createPost: ControllerMethod = async (req:any )=> {
        
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)
       
        if(!validatedSession){
            return {success:false,error:"requires validated session"}
        }

        let parentUserId = mongoIdToString(validatedSession._id)

        
 
        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(req.fields, {parentThreadId:'string',body:'string' })

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data

        
        const {body,parentThreadId} = sanitizedData


        let insertResponse = await this.insertNewPost( {parentUserId,parentThreadId,body} )
 

        if(!insertResponse.success) return   insertResponse
        
 
      
        return insertResponse  
    }


    insertNewPost:InternalMethod = async ( {parentUserId,parentThreadId,body}:{parentUserId:string,parentThreadId:string,body:string} ) => {
    
        let insertionData:Slug  = {
            parentUserId,
            parentThreadId, 
            body,

            status: 'active'
        }

       return await createRecord( insertionData, PostDefinition, this.mongoDB  )
 
    }
 

 
    static async getPostRenderData(post:Post,  mongoDB: ExtensibleDB ){

        let postId = mongoIdToString( post._id ) 

        return {
            postId,
            parentThreadId: post.parentThreadId,
            parentUserId: post.parentUserId,
            body: unescapeString(post.body)
        }
    }
  

}