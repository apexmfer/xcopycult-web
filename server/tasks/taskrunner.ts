

import { DegenAuthExtension } from 'degen-auth'
import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'
import { mongo } from 'mongoose'
 
//import FileHelper from '../lib/file-helper.js'
  
import Web3 from 'web3'
import { APP_NAME } from '../../server/lib/app-helper'
import DigitalAssetDBExtension from '../dbextensions/DigitalAssetDBExtension'
import ImageDBExtension from '../dbextensions/ImageDBExtension'
import UserDBExtension from '../dbextensions/UserDBExtension'
import { fetchAssetMetadata } from './fetch-asset-metadata'
import { parseSuperrareInput } from './parse-sr-input'
import { scrapeDataLocal } from './scrape-data-local'
import { scrapeDataOpensea } from './scrape-data-opensea'

let envmode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'




const taskMap: any = { 
  fetchAssetMetadata,
  scrapeDataOpensea,
  scrapeDataLocal,
  parseSuperrareInput
}

/*

npm run task scrapeDataOpensea xcopy

npm run task fetchAssetMetadata

npm run task parseSuperrareInput
*/


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
      new UserDBExtension(mongoDB),
      new ImageDBExtension(mongoDB)
    ])

    dbExtensions.map(ext => ext.bindModelsToDatabase())
    
    

    let web3 = new Web3( serverConfig.web3provider  )

    console.log('web3 ready with provider ',serverConfig.web3provider )


    //npm run task 
    const args = process.argv.slice(2)


    const taskName = args[0]

    const taskMethod = taskMap[taskName]
  
    if (typeof taskMethod == 'undefined') throw new Error('unknown task')


    let taskArgs = args.slice(1)
    
    await taskMethod(taskArgs, mongoDB)

    console.log('Task finished. ')
     

}

 
 start()