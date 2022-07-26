 
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


export default class UserSessionController extends APIController {

    
    
    constructor(public mongoDB:ExtensibleDB, public userController:UserController){
         super(mongoDB)
    }
   
   
    getControllerName() : string {
        return 'usersession'
    }


    getRoutes() : Route[] {
        return [
            {"type":"get","uri":"/usersession/logout","method":"redirectHome","preHooks":[{"method":"clearUserSession", "controller":this.getControllerName()}], "controller":this.getControllerName()},
            
   
        ]
    }


    //A prehook used to log out via cookies by setting sessionToken null 
    clearUserSession: InternalMethod = async (req:any) => {
        return {success:true, specialAction:'setCookie', data:{key:"sessionToken"}}
    }

    /*
    logout: ControllerMethod = async (req:any) => {

        return {success:true, specialAction:'redirect', data:{url:"/"}}//user will clear auth cookies on their end 
    }
    */

    redirectHome: ControllerMethod = async (req:any) => {
       
        return {success:true, specialAction:'redirect', data:{url:"/"}}//user will clear auth cookies on their end 
    }


    requiresLogin: InternalMethod = async(req:any) => {

       
        let result =  await this.validateSessionToken(req)

        if(AppHelper.getEnvironmentName() == 'development'){
            //no auth needed in dev 
            result = {success:true}
        }



        //if req type is get 
        if(!result.success){
            if(req.method.toLowerCase()=="get"){
                return await this.redirectHome(req) //redirect home 
            }else{
                return {success:false,error:'requiresLogin'}
            }
        }

        return result
    }

     /*
    Used as a prehook to gate pages that require login 
    */
    validateSessionToken: InternalMethod = async(req:any) => {

        const cookies = req.cookies
        

        const sessionToken = cookies.sessionToken
        if(!sessionToken) return {success:false, error:"Missing session token"}

        let matchingTokenResponse = await findRecord({sessionToken}, UserSessionDefinition, this.mongoDB)
        if(!matchingTokenResponse.success) return matchingTokenResponse

        let matchingToken = matchingTokenResponse.data 

        let matchingUserResponse = await findRecordById(matchingToken.parentUserId, UserDefinition,this.mongoDB)
        if(!matchingUserResponse) return matchingUserResponse

        //inject validated user data into req for the next hook
        req.validatedSessionUser = matchingUserResponse.data

        return {success:true, data: {userId: matchingToken.parentUserId}}

    }


    static getValidatedSessionUserFromHeader(req:any){

        if(AppHelper.getEnvironmentName() == 'development'){
            return {_id:'dev_session_id', userId: 'dev_session_id'} 
        }


        if(AppHelper.getEnvironmentName() == 'test'){
            return {_id:'test_session_id', userId: 'test_session_id'} 
        }

        let output = Object.apply({}, req.validatedSessionUser)
        output.userId = mongoIdToString(req.validatedSessionUser._id)

        return output 
 
    }
 
    /*
    Used as a prehook during oauth flow to set authToken cookie 
    */
    createNewAuthenticatedUserSession: InternalMethod = async (req:any) => {
        
        let userData = req.user

        let primaryEmailObject = userData.emails[0]

        if(!primaryEmailObject.verified){
            return {success:false, error:"Primary email not verified"}
        }

        let primaryEmail = primaryEmailObject.value.toLowerCase()

        let matchingUser;
        let matchingUserResponse = await findRecord({email:primaryEmail},UserDefinition,this.mongoDB)

        if(!matchingUserResponse.success){
            //create a new user 

            let createdUserResponse = await this.userController.insertNewUser( {email: primaryEmail} )
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

      

        return  {success: true, specialAction: 'setCookie', data: {key:'sessionToken', value:sessionCreationResponse.data.sessionToken}}
       /* if(!sessionCreationResponse.success){
            return sessionCreationResponse
        }

        return {success:true, data:{ authToken }}*/
    }


    insertUserSession:InternalMethod = async (user:User) => {

        let sessionToken = UserSessionController.generateNewAuthToken()

        let parentUserId = mongoIdToString(user._id)

        let currentTime = Date.now().toString()

        let newRecordResponse = await createRecord( {
            parentUserId,
            sessionToken,
            lastUsed: currentTime,
            createAt: currentTime

        }, UserSessionDefinition, this.mongoDB  )

        return {success:true, data: {sessionToken, userId: parentUserId}}
    }


    static generateNewAuthToken(){
        return crypto.randomBytes(24).toString('hex');
    }

/*
     
    destroyUserSession: InternalMethod = async (req:any) => {

        return {success:true}
    }

*/
  

}