import chai, { expect } from 'chai'

import axios from 'axios'

import WebServer from '../server/lib/web-server'


import Web3 from 'web3'

import FormData from 'form-data'
 
  
import AppHelper from '../server/lib/app-helper'
  

import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'

import fs from 'fs'

import DegenAuth from 'degen-auth'
 
 
import {resolveRoutedApiQuery,resolveURIFromRouteName} from '../src/js/rest-api-helper'

import FileHelper from '../server/lib/file-helper'
 
import { Wallet } from 'ethers'
import TestController from '../server/controllers/TestController'
 
let envmode = AppHelper.getEnvironmentName()

let serverConfigFile = FileHelper.readJSONFile('./server/serverconfig.json')
let serverConfig = serverConfigFile[envmode]

var tcpPortUsed = require('tcp-port-used');


const serverPort = 6000
const uri_root = `http://localhost:${serverPort}`



const buyerWallet = Wallet.createRandom()
const shopWallet = Wallet.createRandom()


let webServer;
 
let mongoDB = new ExtensibleMongoDB(  ) 

describe('Web server',    () => {

    describe('Request', () => {

    let webServer ;

        before(async () => {
           //boot web server 

           FileHelper.mkdirSync('./test/cache')

           console.log('server config: ',serverConfig)

           console.log('envmode',envmode)


           let appName = AppHelper.getAppName()

           
           await mongoDB.init(  appName.concat('_').concat(envmode) )

 
           await mongoDB.dropDatabase()
        
           
           //let degenAuthInterface = await AuthTools.initializeDatabase()
       
           let dbExtensions:Array<DatabaseExtension> = []
    
           dbExtensions.push(...[ 
            
           ])

           dbExtensions.map(ext => ext.bindModelsToDatabase())
       


            let apiControllers = [
               new TestController(mongoDB)
              ]
    

           
           let web3 = new Web3( serverConfig.web3provider  )

           let serverModules = []

           webServer = new WebServer(
                web3, 
                serverConfig, 
                apiControllers,
                serverModules
                )

            
            let portUsed = await tcpPortUsed.check(serverPort, 'localhost')
             
            if(!portUsed){
                await webServer.start(  )
            }else{
                console.log(`Detected server already listening on port ${serverPort}`)
            }
            
            

        })

        after(async () => {
            await webServer.stop(  )
            await mongoDB.disconnect()
        })
        
        it('should load active routes', async () => {


            let defaultRoutes = [

                {"type":"post","uri":"/project/create","method":"createProject","controller":"project"},
                {"type":"post","uri":"/endpoint/create","method":"createEndpoint","controller":"endpoint"},
                {"type":"get","uri":"/test/create","method":"create","controller":"test"}
                
            ]

            let testController = new TestController(mongoDB)

            let apiControllers = [
                testController
               ]
 
           let routes = WebServer.getActiveRoutes( defaultRoutes, apiControllers )
           
           expect(routes).to.exist
           expect(routes.length).to.eql(1 + testController.getRoutes().length)
           

        })




        it('should return a response', async () => {
 
            let result = await axios.get( uri_root + '/api/ping' ,  {}  )
            
            expect(result).to.exist
            expect(result.data.success ).to.eql(true)

        })



        //formidable is messing w the image binary data... ? 

        




    })

})

