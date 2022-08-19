import DegenAuth, { AuthenticationToken, AuthenticationTokenDefinition } from "degen-auth";
import ExtensibleDB from 'extensible-mongoose'
import AppHelper from "../lib/app-helper";

import { ControllerMethod, Route } from "degen-route-loader"
import APIController from "./APIController";
import APIHelper from "../lib/api-helper";
import { findRecord } from "../lib/mongo-helper";
import UserSessionController from "./UserSessionController";

const SERVICE_NAME = "xcopycult"
 

export const controllerName = "degenauth"


export const routes: Route[]=[

    {"type":"post","uri":"/generateChallenge","method":"generateChallenge","controller":controllerName}
    
]

export default class DegenAuthController extends APIController  {
     
    

    constructor(public mongoDB:ExtensibleDB, public userSessionController:UserSessionController){
        super(mongoDB);
    }
    

    getRoutes() : Route[] {
        return routes
    }



    getControllerName() : string {
        return controllerName
    }
 
    generateChallenge: ControllerMethod = async (req: any) => {
        
        const publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress,'publicaddress')
       
        //make sure public address is a valid address 
  
        let upsertedChallenge  = await DegenAuth.upsertNewChallengeForAccount( 
            this.mongoDB, 
            publicAddress, 
            SERVICE_NAME
             )

        console.log('upsertedChallenge',upsertedChallenge)

        return   {success:true, data:{ publicAddress:publicAddress, challenge: upsertedChallenge} }
    }

    //not used
    generateDegenAuthSession: ControllerMethod = async (req: any) => {
        
        const publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress,'publicaddress')
        const signature = req.fields.signature
  
        let authTokenResponse  = await DegenAuth.generateAuthenticatedSession(
             this.mongoDB, 
             publicAddress, 
             signature )

        if(!authTokenResponse.success) return authTokenResponse

        let authToken = authTokenResponse.authToken
 

        return  {success:true, data: {publicAddress, authToken} }
    }


    generateUserSession: ControllerMethod = async (req: any) => {
        
        const publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress,'publicaddress')
        const signature = req.fields.signature
        let challenge = req.fields.challenge

        if(!challenge){
            let challengeRecord = await DegenAuth.findActiveChallengeForAccount(this.mongoDB,publicAddress)
              
            if(challengeRecord){
            challenge = challengeRecord.challenge
            }
          }
    
          if(!challenge){
            return {success:false, error:'no active challenge found for user'} 
          }

        //validate signature

        let signatureValid =  DegenAuth.validatePersonalSignature(publicAddress,signature,challenge)

        if(!signatureValid){
            return {success:false, error:"signature invalid"}
        }
 
  
        let newSessionResponse  = await this.userSessionController.createNewAuthenticatedUserSession(
             req  )

        if(!newSessionResponse.success) return newSessionResponse

        let sessionToken = newSessionResponse.data
 

        return  {success:true, data: {publicAddress, sessionToken} }
    }

    //not used 
    /* 
    validateAuthToken: ControllerMethod = async (req: any) => {

        
        
        const publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress,'publicaddress')
        const authToken = APIHelper.sanitizeInput(req.fields.authToken,'string')

        let matchingTokenResponse  = await findRecord( {token: authToken },  AuthenticationTokenDefinition,  this.mongoDB )

        if(!matchingTokenResponse.success){
            return  {success:false, error: "#401: Not authenticated with DegenAuth session."}
        }

        let matchingTokenRecord = matchingTokenResponse.data 

        if(matchingTokenRecord && matchingTokenRecord.publicAddress == publicAddress ){
            return  {success:true, data: {publicAddress, authToken } }
        } 
      
        return  {success:false, error: "Not authenticated with DegenAuth session.", specialAction:'reject'}


    }
    */

}