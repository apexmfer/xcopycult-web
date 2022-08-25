
 
 import express from 'express'
 
 import cors from 'cors'
 const formidable = require('express-formidable')

 
import fs from 'fs'
import path from 'path'

// @ts-ignore
import  history from 'connect-history-api-fallback'
import  bodyParser from 'body-parser' 
 
import web3utils from 'web3-utils'

import http from 'http'
import https from 'https'

import DegenRouteLoader, { Route } from 'degen-route-loader'
 

import FileHelper from './file-helper'

import APIController from '../controllers/APIController'
import ServerModule from '../servermods/ServerModule'


const MAX_FILE_SIZE = 10485760 //bytes //10MB

const sharedRoutes:Array<Route> = FileHelper.readJSONFile('./shared/routes/all_routes.json')
 

 

export default class WebServer  {



  //  server:https.Server|http.Server

    
    app:any

    apiPort:number

    degenRouteLoader:DegenRouteLoader

    appListener: any

    constructor(
      public web3:any, 
      public serverConfig:any,
      public apiControllers: Array< APIController >,
      public serverModules: ServerModule[]
      ){
      
 
         

        this.app = express()

        this.degenRouteLoader = new DegenRouteLoader({verboseLogging:true})

        this.apiPort = this.serverConfig.port? this.serverConfig.port : 3000



        //var server = http.createServer(app);

        let envmode = process.env.NODE_ENV

        /*if(serverConfig.useHTTPS == true ){
          this.server = https.createServer({
            cert: fs.readFileSync('/home/andy/deploy/cert/starflask.com.pem'),
            key: fs.readFileSync('/home/andy/deploy/cert/starflask.com.key')
          });
          console.log('--using https--')
         
        }else{
          
          this.server = http.createServer(this.app);
        }*/
         
        this.app.use(cors());


        let formidableOptions= {
          maxFileSize : MAX_FILE_SIZE,
         // encoding: 'base64'

        }

        this.app.use(formidable(formidableOptions))
  
        //this.app.use(express.json());

        for(let mod of serverModules){
          mod.init(this.app)
        }
  
       
  
    }


    async start(    ){
      

      //Load all of the api controllers similar to rails 
      this.apiControllers.map( controller  => { 
   
        this.degenRouteLoader.registerController( controller.getControllerName(),  controller)
 
      })

     
      let activeRoutes = WebServer.getActiveRoutes(sharedRoutes, this.apiControllers)

    
      this.degenRouteLoader.loadRoutes( this.app, activeRoutes)
      
      let staticFolderPath = this.serverConfig.staticFolderPath ? this.serverConfig.staticFolderPath : 'dist'
 
      //host static files from dist for webpage 
      const staticFileMiddleware = express.static(staticFolderPath);
      this.app.use(staticFileMiddleware);
      this.app.use(history({
        disableDotRule: true,
        verbose: true
      }));
      this.app.use(staticFileMiddleware);

      


      this.appListener = this.app.listen(this.apiPort, () => {
        console.log(`API Server listening at http://localhost:${this.apiPort}`)
      })


 

    }

    static getActiveRoutes(defaultRoutes: Route[] , apiControllers: APIController[] ): Route[]{

      let controllerNames = apiControllers.map( controller => controller.getControllerName() )

     
      //load only the shared routes which have names matching the controllers we are loading 
      let filteredSharedRoutes = defaultRoutes.filter( route => (controllerNames.includes(route.controller) ) )
      
      let controllerRoutes:Route[] = []
      
      apiControllers.map(controller => {controllerRoutes = controllerRoutes.concat(controller.getRoutes())} )
 

      return filteredSharedRoutes.concat(controllerRoutes) 
    }


    async stop(    ){
      if(this.appListener){
        this.appListener.close()
      }
      


    }
 

}