 
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
import UserController from "./UserController";
import { User, UserDefinition, UserSessionDefinition } from "../dbextensions/UserDBExtension";


const adminList = require("../../shared/config/adminList.json")
export default class UserSessionController extends APIController {

    
    
    constructor(public mongoDB:ExtensibleDB, public userController:UserController){
         super(mongoDB)
    }
   
   
    getControllerName() : string {
        return 'usersession'
    }


    getRoutes() : Route[] {
        return [
            
        ]
    }
 
 

    userIsAdmin: InternalMethod = async(req:any) => {

        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
             {publicAddress:'publicaddress'  })

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data 
        
        const {publicAddress} = sanitizedData

        if(adminList.includes(APIHelper.toChecksumAddress(publicAddress))){

            return {success:true}

        }

        return {success:false, error:'Not an admin'}

         
    }
 

    validateSessionTokenParam : InternalMethod = async(req:any) => {

        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
             {  sessionToken:'string' })

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data

        
        const {sessionToken} = sanitizedData


        let matchingTokenResponse = await findRecord({sessionToken}, UserSessionDefinition, this.mongoDB)
        if(!matchingTokenResponse.success) return matchingTokenResponse

        let matchingToken = matchingTokenResponse.data 

        let matchingUserResponse = await findRecordById(matchingToken.parentUserId, UserDefinition,this.mongoDB)
        if(!matchingUserResponse) return matchingUserResponse


        return {success:true, data: {userId: matchingToken.parentUserId, sessionToken}}

    }



 
    createNewAuthenticatedUserSession: InternalMethod = async (req:any) => {
        
        const sanitizeResponse = APIHelper.sanitizeAndValidateInputs(
            req.fields,
             {publicAddress:'publicaddress'  })

        if(!sanitizeResponse.success) return sanitizeResponse

        let sanitizedData = sanitizeResponse.data

        
        const {publicAddress} = sanitizedData

        let matchingUser;
        let matchingUserResponse = await findRecord({publicAddress},UserDefinition,this.mongoDB)

        if(!matchingUserResponse.success){
            //create a new user 

            let createdUserResponse = await this.userController.insertNewUser( { publicAddress } )
            if(!createdUserResponse.success) return createdUserResponse

            matchingUser = createdUserResponse.data 
        }else{
            matchingUser = matchingUserResponse.data
        }

      
        //look for a user that already exists with the email address 


        
        if(!matchingUser){
            return {success:false, error:"Unable to find or create user for auth flow"}
        }

        let sessionCreationResponse = await this.insertUserSession(matchingUser)

        if(!sessionCreationResponse.success) return sessionCreationResponse

      

        return  {success: true,  data: sessionCreationResponse.data.sessionToken}
      
    }


    insertUserSession:InternalMethod = async (user:User) => {

        let sessionToken = UserSessionController.generateNewAuthToken()

        let parentUserId = mongoIdToString(user._id)

        let currentTime = Date.now().toString()

        let newRecordResponse = await createRecord( {
            parentUserId,
            sessionToken,
            lastUsed: currentTime,
            createdAt: currentTime

        }, UserSessionDefinition, this.mongoDB  )

        if(!newRecordResponse.success){
            return newRecordResponse
        }

        return {success:true, data: {sessionToken, userId: parentUserId}}
    }


    static generateNewAuthToken(){
        return crypto.randomBytes(24).toString('hex');
    }
 




 
  

}