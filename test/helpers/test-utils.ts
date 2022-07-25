 
import { AssertionResponse } from "degen-route-loader"
import { Wallet } from "ethers"
import ExtensibleDB from "extensible-mongoose"
  
import ProjectController from "../../server/controllers/ProjectController" 
import AppHelper from "../../server/lib/app-helper"
import { findRecordById } from "../../server/lib/mongo-helper"
import { mongoIdToString } from "../../server/lib/parse-helper"




export async function getTestDatabase(): Promise<ExtensibleDB>{


    let envmode = AppHelper.getEnvironmentName()


    let mongoDB = new ExtensibleDB()
    await mongoDB.init( 'rqrcodes_'.concat(envmode) )
    return mongoDB
}
 

 