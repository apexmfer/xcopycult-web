 
import AppHelper from "../lib/app-helper";

import { ControllerMethod, AssertionResponse, Route } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import AttachedImageController, { FileValidation } from "./AttachedImageController";
 
import ExtensibleDB from 'extensible-mongoose'
  
import { createRecord, deleteRecord, findRecordById, findRecords } from "../lib/mongo-helper";
import APIController from "./APIController"; 
  
import { escapeString, mongoIdToString, stringToMongoId, unescapeString } from "../lib/parse-helper"; 
import SlugController from "./PostController";
import UserSessionController from "./UserSessionController";
import PostController from "./PostController";
import { Thread, ThreadDefinition } from "../dbextensions/ThreadDBExtension";
 
 import {Category, CategoryDefinition} from "../dbextensions/CategoryDBExtension"
 

export default class ThreadController extends APIController {

    constructor(public postController: PostController, mongoDB:ExtensibleDB){
        super(mongoDB)
    }

    getControllerName() : string {
        return 'thread'
    }

    getRoutes() : Route[] {
       return  []        
    } 

    createThread: ControllerMethod = async (req:any )=> {

        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)
       
        if(!validatedSession){
            return {success:false,error:"requires validated session"}
        }

        let parentUserId =validatedSession.userId
 

        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(req.fields, {title:'string',body:'string', parentCategoryId:'string'})

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data

        
        const {body,title,parentCategoryId} = sanitizedData

        let insertInitialPostResponse = await this.postController.insertNewPost( 
            {body,parentUserId})
        
        if(!insertInitialPostResponse.success){
            return insertInitialPostResponse
        }

        let initialPost = insertInitialPostResponse.data

        const primaryPostId = mongoIdToString(initialPost._id)

     
        let insertThreadResponse = await this.insertNewThread( 
            {title , parentUserId , parentCategoryId, primaryPostId } )
 

        if(!insertThreadResponse.success){ 
            return insertThreadResponse
        }
         
 
  
        return insertThreadResponse  
    }


    getThread: ControllerMethod = async (req:any )=> {
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)

        let parentUserId = mongoIdToString(validatedSession._id)
 
        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(req.fields, {threadId:'string'})

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data
        
        const {threadId} = sanitizedData

      
        let matchingThreadResponse = await findRecordById( threadId, ThreadDefinition, this.mongoDB )

        console.log('matchingThreadResponse',matchingThreadResponse)
        if(!matchingThreadResponse.success) return matchingThreadResponse

        let data = await ThreadController.getThreadRenderData( matchingThreadResponse.data , this.mongoDB)
 
        return {success:true, data}
    }

    getThreads: ControllerMethod = async (req:any )=> {
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)

        let parentUserId = mongoIdToString(validatedSession._id)
 
      
        let matchingThreadsResponse = await findRecords( {parentUserId}, ThreadDefinition, this.mongoDB )

        console.log('matchingThreadsResponse',matchingThreadsResponse)
        if(!matchingThreadsResponse.success) return matchingThreadsResponse


        let outputArray = await Promise.all(matchingThreadsResponse.data.map( x => ThreadController.getThreadRenderData( x , this.mongoDB)))

        return {success:true, data: outputArray}
    }

    async insertNewThread(
        {title, parentUserId, parentCategoryId , primaryPostId}:
        {title:string, parentUserId:string, parentCategoryId: string  , primaryPostId:string} ): Promise<AssertionResponse>{

            title = escapeString(title.toLowerCase())

            const urlSlug = APIHelper.buildSlug(title)

            const currentTime = Date.now().toString() 

        let threadData:Thread  = {
            title,
            urlSlug,
             
            parentUserId, 

            parentCategoryId,
            primaryPostId, 

         //   priceUsdCents,
            createdAt: currentTime,
            status: 'active'
        }

       return await createRecord( threadData, ThreadDefinition, this.mongoDB  )
 
    }

 

 
    static async getThreadRenderData(thread:any,  mongoDB: ExtensibleDB ){

        let threadId = mongoIdToString( thread._id ) 

        let parentCategoryResponse = await findRecordById(thread.parentCategoryId,CategoryDefinition,mongoDB)

        let parentCategoryName;

        if(parentCategoryResponse.success){
            let parentCategory:Category = parentCategoryResponse.data 

            parentCategoryName = parentCategory.name
        }

        return {
            threadId,
            title: unescapeString(thread.title),
            urlSlug: unescapeString(thread.urlSlug),
            createdAt: thread.createdAt,
            parentCategoryName
            
            
        }
    }
  

} 