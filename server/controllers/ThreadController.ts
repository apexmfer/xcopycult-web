 
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
import { Endpoint, EndpointDefinition } from "../dbextensions/EndpointDBExtension";
import SlugController from "./SlugController";
import UserSessionController from "./UserSessionController";
 
 
 

export default class EndpointController extends APIController {

    constructor(public slugController: SlugController, mongoDB:ExtensibleDB){
        super(mongoDB)
    }

    getControllerName() : string {
        return 'endpoint'
    }

    getRoutes() : Route[] {
       return  []        
    } 

    createEndpoint: ControllerMethod = async (req:any )=> {

        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)
      
       
        if(!validatedSession){
            return {success:false,error:"requires validated session"}
        }
        let parentUserId = mongoIdToString(validatedSession._id)

        let validation = APIHelper.validateExists(
            ["name","actionType","actionData"],
             req.fields)
        if(!validation.success) return validation

       
        let name = APIHelper.sanitizeInput( req.fields.name.toLowerCase(), 'string' ) 
     //   let parentProjectId = APIHelper.sanitizeInput(req.fields.parentProjectId, 'string')

        let parentProjectId = undefined 

        let actionType = 'redirect'
        let actionData = APIHelper.sanitizeInput(req.fields.actionData, 'string')
         
        //let actionData = APIHelper.sanitizeInput(req.fields.actionData, 'string')

        let insertEndpointResponse = await this.insertNewEndpoint( 
            {name , parentUserId, actionType, actionData } )
 

        if(!insertEndpointResponse.success){ 
            return insertEndpointResponse
        }
        
        let endpointData = insertEndpointResponse.data 
        const parentEndpointId = mongoIdToString(endpointData._id )


        let insertSlugResponse = await this.slugController.insertNewSlug( 
            parentEndpointId)

        if(!insertSlugResponse.success){

            //delete the endpoint 
            await deleteRecord(parentEndpointId,EndpointDefinition,this.mongoDB)

            return insertSlugResponse
        }

  
        return insertEndpointResponse  
    }


    getEndpoints: ControllerMethod = async (req:any )=> {
        let validatedSession = UserSessionController.getValidatedSessionUserFromHeader(req)

        let parentUserId = mongoIdToString(validatedSession._id)
 
        console.log('get endpoints with ',parentUserId)

        let matchingEndpointsResponse = await findRecords( {parentUserId}, EndpointDefinition, this.mongoDB )

        console.log('matchingEndpointsResponse',matchingEndpointsResponse)
        if(!matchingEndpointsResponse.success) return matchingEndpointsResponse


        let endpointsArray = await Promise.all(matchingEndpointsResponse.data.map( x => EndpointController.getEndpointRenderData( x , this.mongoDB)))

        return {success:true, data: endpointsArray}
    }

    async insertNewEndpoint(
        {name, parentUserId, actionType, actionData }:
        {name:string, parentUserId:string, actionType: string, actionData: string  } ): Promise<AssertionResponse>{

        name = escapeString(name.toLowerCase())

        

        let endpointData:Endpoint  = {
            name,
             
            parentUserId, 

            actionType,
            actionData,

         //   priceUsdCents,
            status: 'active'
        }

       return await createRecord( endpointData, EndpointDefinition, this.mongoDB  )
 
    }


    static async getRedirectURLForEndpoint(endpoint:Endpoint, mongoDB: ExtensibleDB){
        
        let redirectURL = APIHelper.unescapeString(endpoint.actionData)

        return redirectURL
    }


 
    static async getEndpointRenderData(endpoint:any,  mongoDB: ExtensibleDB ){

        let endpointId = mongoIdToString( endpoint._id ) 

        return {
            endpointId,
            name: unescapeString(endpoint.name),
           
            actionType: unescapeString(endpoint.actionType),
            actionData: unescapeString(endpoint.actionData)
        }
    }
  

}