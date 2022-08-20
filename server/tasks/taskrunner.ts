

import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'


import DatabaseTasks from './database-tasks.js'
import MintEstimateTasks from './mint-estimate-tasks.js'

import AssetHelper from '../lib/asset-helper.js'

import FileHelper from '../lib/file-helper.js'
  
import Web3 from 'web3'
import { APP_NAME } from '../lib/app-helper.js'
import { scrapeDataOpensea } from './scrape-data-opensea.js'

let envmode = process.env.NODE_ENV


let serverConfigFile = FileHelper.readJSONFile('./server/serverconfig.json')
let serverConfig = serverConfigFile[envmode]

//let assetConfig = FileHelper.readJSONFile('./server/assetconfig.json')
 

  async function start(){

    console.log('server config: ',serverConfig)


 
    let mongoDB = new ExtensibleMongoDB(  ) 
    await mongoDB.init(  APP_NAME.concat('_').concat(envmode) )

  

    let web3 = new Web3( serverConfig.web3provider  )

    console.log('web3 ready with provider ',serverConfig.web3provider )

    let contractAddress = AssetHelper.getMineableTokenAddressFromChainId( serverConfig.chainId ) 

    await scrapeDataOpensea({collectionName:'xcopy'},mongoDB)

    //await DatabaseTasks.deleteDifficultyAndHashrateData(vibegraphInterface, contractAddress)

    //await MintEstimateTasks.estimateDifficultyForAllMints(vibegraphInterface, contractAddress)
    //await MintEstimateTasks.estimateHashrateForAllMints(vibegraphInterface, contractAddress)


}

 
 start()