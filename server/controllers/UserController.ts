 
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
import { User, UserDefinition } from "../dbextensions/UserDBExtension";
import UserSessionController from "./UserSessionController";

export default class UserController extends APIController {

    getControllerName() : string {
        return 'user'
    }

    getRoutes() : Route[] {
        return [
            {"type":"get","uri":"/user/data","method":"getUserData","preHooks":[{"method":"requiresLogin", "controller": 'usersession'}], "controller":this.getControllerName()},
            
   
        ]
    }


 
    //make sure people cant CSRF or MITM attack this -- use session key? or something 
    getUserData: ControllerMethod = async (req:any ) => {

        let sessionUser = UserSessionController.getValidatedSessionUserFromHeader(req)
        
        return   {success:true, data:{sessionUser} } 


    } 


    //insert new user


    insertNewUser:InternalMethod = async ( {email,publicAddress}:{email:string|undefined, publicAddress:string|undefined} ) => {
        
        if(!email && !publicAddress) return {success:false, error:"New user must have either an email or a public address"}

        let currentTime = Date.now().toString()

        let insertionData:User  = {
            email,
            publicAddress,

            lastSeen:currentTime,
            createdAt: currentTime
        }

       return await createRecord( insertionData,
         UserDefinition, this.mongoDB  )
 
    }
    //create session 


  

}