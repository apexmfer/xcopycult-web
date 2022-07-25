import DegenAuth, { AuthenticationToken, AuthenticationTokenDefinition } from "degen-auth";
import ExtensibleDB from 'extensible-mongoose'
import AppHelper from "../lib/app-helper";

import { ControllerMethod } from "degen-route-loader"
import APIController from "./APIController";
import APIHelper from "../lib/api-helper";
import { findRecord } from "../lib/mongo-helper";


export default class DegenAuthController extends APIController  {

  
 
    generateChallenge: ControllerMethod = async (req: any) => {
        
        const publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress,'publicaddress')
        const serviceName = req.fields.serviceName
  
        let upsertedChallenge  = await DegenAuth.upsertNewChallengeForAccount( this.mongoDB, publicAddress, serviceName )

        console.log('upsertedChallenge',upsertedChallenge)

        return   {success:true, data:{ publicAddress:publicAddress, challenge: upsertedChallenge} }
    }

    generateUserSession: ControllerMethod = async (req: any) => {
        
        const publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress,'publicaddress')
        const signature = req.fields.signature
  
        let authToken  = await DegenAuth.generateAuthenticatedSession( this.mongoDB, publicAddress, signature )

        console.log('authToken',authToken)

        return  {success:true, data: {publicAddress:publicAddress, authToken: authToken} }
    }

    validateAuthToken: ControllerMethod = async (req: any) => {

        //return true for now until authentication check is built out 
        return  {success:true}

        /*
        
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
      
        return  {success:false, error: "#401: Not authenticated with DegenAuth session."}*/
    }
    

}