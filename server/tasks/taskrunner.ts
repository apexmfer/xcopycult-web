

import { DegenAuthExtension } from 'degen-auth'
import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'
 
//import FileHelper from '../lib/file-helper.js'
  
import Web3 from 'web3'
import { APP_NAME } from '../../server/lib/app-helper'
import DigitalAssetDBExtension from '../dbextensions/DigitalAssetDBExtension'
import UserDBExtension from '../dbextensions/UserDBExtension'
import { fetchAssetMetadata } from './fetch-asset-metadata'
import { scrapeDataOpensea } from './scrape-data-opensea'

let envmode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'


let serverConfigFile = require('../../server/serverconfig.json')
let serverConfig = serverConfigFile[envmode]

//let assetConfig = FileHelper.readJSONFile('./server/assetconfig.json')
 

  async function start(){

   

 
    let mongoDB = new ExtensibleMongoDB(  ) 
    await mongoDB.init(  APP_NAME.concat('_').concat(envmode) )

  
    let dbExtensions:Array<DatabaseExtension> = []
    
    dbExtensions.push(...[
      new DegenAuthExtension(mongoDB),
      new DigitalAssetDBExtension(mongoDB), 
      new UserDBExtension(mongoDB)
    ])

    dbExtensions.map(ext => ext.bindModelsToDatabase())
    
    

    let web3 = new Web3( serverConfig.web3provider  )

    console.log('web3 ready with provider ',serverConfig.web3provider )

  
   // await scrapeDataOpensea({collectionName:'xcopy'},mongoDB)
    await fetchAssetMetadata( mongoDB )
     

}

 
 start()