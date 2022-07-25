import DegenAuth, { AuthenticationToken, AuthenticationTokenDefinition } from "degen-auth";
import ExtensibleDB from 'extensible-mongoose'
import AppHelper from "../lib/app-helper";

import { ControllerMethod, Route } from "degen-route-loader"
import APIController from "./APIController";
import APIHelper from "../lib/api-helper";
import { findRecord } from "../lib/mongo-helper";
import UserSessionController from "./UserSessionController";


export default class OAuthController extends APIController  {

  
    constructor(public mongoDB:ExtensibleDB, public userSessionController:UserSessionController){
        super(mongoDB)
    }

    getControllerName() : string {
        return 'oauth'
    }

    getRoutes() : Route[] {
        return [
            {"type":"get","uri":"/oauth/success","method":"authSuccessRedirect","preHooks":[{"method":"createUserSession", "controller":this.getControllerName()}], "controller":this.getControllerName()},
   
        ]
    }

    //this is run as a prehook and just sets cookie on user end 
    createUserSession: ControllerMethod = async (req: any) => {
        
      
         //verify that this is not MITM attack -- actually from oauth flow 
        if(req.isAuthenticated()){
            //create a user authentication key and give it to the user -> they store in their cookies to use throughout the app
            return await this.userSessionController.createNewAuthenticatedUserSession(req)
        }

        return {success:false, error:"Unknown oauth error"}
    }

    
    authSuccessRedirect: ControllerMethod = async (req: any) => {
         
  
        return {success:true, data:{url:'/'}, specialAction: 'redirect'}
    }


    //authError: ControllerMethod = async (req: any) => {}

  

}