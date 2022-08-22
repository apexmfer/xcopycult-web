

 
import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'


import WebServer from './lib/web-server'

import FileHelper from './lib/file-helper'
  
import AppHelper, { APP_NAME } from './lib/app-helper'
  

import {DegenAuthExtension} from 'degen-auth'

 
import Web3 from 'web3'

 

import ServerSegmentManager from './segmentmanagers/ServerSegmentManager'
 
import ServerModule from './servermods/ServerModule'
import OAuthModule from './servermods/OAuthModule'
import UserController from './controllers/UserController'
import OAuthController from './controllers/OAuthController'
import UserDBExtension from './dbextensions/UserDBExtension'
import UserSessionController from './controllers/UserSessionController'
import DigitalAssetDBExtension from './dbextensions/DigitalAssetDBExtension'
import CategoryDBExtension from './dbextensions/CategoryDBExtension'
import CategoryManager from './segmentmanagers/CategoryManager'
import DigitalAssetController from './controllers/DigitalAssetController'
import DegenAuthController from './controllers/DegenAuthController'
import ThreadController from './controllers/ThreadController'
import ImageDBExtension from './dbextensions/ImageDBExtension'


require('dotenv').config()
 

let envmode = AppHelper.getEnvironmentName()

let serverConfigFile = FileHelper.readJSONFile('./server/serverconfig.json')
let serverConfig = serverConfigFile[envmode]

//let assetConfig = FileHelper.readJSONFile('./server/assetconfig.json')
  
  async function start(){

    console.log('server config: ',serverConfig)

     validateServerConfig()

    let mongoDB = new ExtensibleMongoDB(  ) 
    await mongoDB.init(  APP_NAME.concat('_').concat(envmode) )



//Initialize the db extensions
    let dbExtensions:Array<DatabaseExtension> = []
    
    dbExtensions.push(...[
      new DegenAuthExtension(mongoDB),
      new DigitalAssetDBExtension(mongoDB), 
      new UserDBExtension(mongoDB),
      new ImageDBExtension(mongoDB)
    ])

    dbExtensions.map(ext => ext.bindModelsToDatabase())
    
    //Initialize the server segment managers which are also db extensions
    let serverSegmentManagers:Array<ServerSegmentManager> = []
    serverSegmentManagers.push(...[     
      //new CategoryManager(mongoDB)
    ])
    serverSegmentManagers.map(ext => ext.init())



    
    let web3 = new Web3( serverConfig.web3provider  )

    console.log('web3 ready with provider ',serverConfig.web3provider )
    
    let userController = new UserController(mongoDB)
    let userSessionController = new UserSessionController(mongoDB,userController)

    let degenAuthController = new DegenAuthController(mongoDB,userSessionController)
   
    let digitalAssetController = new DigitalAssetController(mongoDB,userSessionController) 
    //init API Controllers 

    let apiControllers = [
      digitalAssetController,   
      degenAuthController,
      userController,
      userSessionController
    ]


    let serverMods: ServerModule[] = [
       
    ]

         

    let webserver = new WebServer(web3, serverConfig, apiControllers, serverMods)
    await webserver.start()
     

  }


  function validateServerConfig(){
     
  }

 
 start()