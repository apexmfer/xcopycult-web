

 
import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'


import WebServer from './lib/web-server'

import FileHelper from './lib/file-helper'
  
import AppHelper from './lib/app-helper'
  

import {DegenAuthExtension} from 'degen-auth'

 
import Web3 from 'web3'



import EndpointController from './controllers/EndpointController'


import EndpointDBExtension from './dbextensions/EndpointDBExtension'


import ServerSegmentManager from './segmentmanagers/ServerSegmentManager'
import ProjectDBExtension from './dbextensions/ProjectDBExtension'
import ProjectController from './controllers/ProjectController'
import SlugController from './controllers/SlugController'
import ServerModule from './servermods/ServerModule'
import OAuthModule from './servermods/OAuthModule'
import UserController from './controllers/UserController'
import OAuthController from './controllers/OAuthController'
import UserDBExtension from './dbextensions/UserDBExtension'
import UserSessionController from './controllers/UserSessionController'


require('dotenv').config()


let envmode = AppHelper.getEnvironmentName()

let serverConfigFile = FileHelper.readJSONFile('./server/serverconfig.json')
let serverConfig = serverConfigFile[envmode]

//let assetConfig = FileHelper.readJSONFile('./server/assetconfig.json')
  
  async function start(){

    console.log('server config: ',serverConfig)

     validateServerConfig()

    let mongoDB = new ExtensibleMongoDB(  ) 
    await mongoDB.init(  'rqrcodes'.concat('_').concat(envmode) )



//Initialize the db extensions
    let dbExtensions:Array<DatabaseExtension> = []
    
    dbExtensions.push(...[
      new DegenAuthExtension(mongoDB),
      new ProjectDBExtension(mongoDB),
      new EndpointDBExtension(mongoDB),
      new UserDBExtension(mongoDB)
    ])

    dbExtensions.map(ext => ext.bindModelsToDatabase())
    
    //Initialize the server segment managers which are also db extensions
    let serverSegmentManagers:Array<ServerSegmentManager> = []
    serverSegmentManagers.push(...[     
      
    ])
    serverSegmentManagers.map(ext => ext.init())



    
    let web3 = new Web3( serverConfig.web3provider  )

    console.log('web3 ready with provider ',serverConfig.web3provider )
 
    let slugController = new SlugController(mongoDB)
    let endpointController = new EndpointController(slugController,mongoDB)
    let userController = new UserController(mongoDB)
    let userSessionController = new UserSessionController(mongoDB,userController)
    let oAuthController = new OAuthController(mongoDB,userSessionController)
    //init API Controllers 

    let apiControllers = [
       new ProjectController(mongoDB), 
       slugController,
       endpointController,
       oAuthController,
       userController,
       userSessionController
    ]


    let serverMods: ServerModule[] = [
      new OAuthModule()
    ]

         

    let webserver = new WebServer(web3, serverConfig, apiControllers, serverMods)
    await webserver.start()
     

  }


  function validateServerConfig(){
     
  }

 
 start()