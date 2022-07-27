 
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

        let parentUserId =validatedSession.userId
 
 
        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(req.fields, {parentThreadId:'string',body:'string' })

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data

        
        const {body,parentThreadId} = sanitizedData


        let insertResponse = await this.insertNewPost( {parentUserId,parentThreadId,body} )
 

        if(!insertResponse.success) return   insertResponse
        
 
      
        return insertResponse  
    }



    getPosts: ControllerMethod = async (req:any )=> {
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)

        let parentUserId = mongoIdToString(validatedSession._id)
        

        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(req.fields, {parentThreadId:'string'})

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data
        
        const {parentThreadId} = sanitizedData


      
        let matchingPostsResponse = await findRecords( {parentThreadId}, PostDefinition, this.mongoDB )

       
        if(!matchingPostsResponse.success) return matchingPostsResponse


        let outputArray = await Promise.all(matchingPostsResponse.data.map( x => PostController.getPostRenderData( x , this.mongoDB)))

        return {success:true, data: outputArray}
    }




    insertNewPost:InternalMethod = async ( {parentUserId,parentThreadId,body}:{parentUserId:string,parentThreadId:string,body:string} ) => {
    
        const currentTime = Date.now().toString()

        let insertionData:Post  = {
            parentUserId,
            parentThreadId, 
            body,

            createdAt: currentTime,
            updatedAt: currentTime,

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