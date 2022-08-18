import { AssertionResponse, Route } from 'degen-route-loader'
import ExtensibleDB, { TableDefinition } from 'extensible-mongoose'
 

export interface MongoRecord  {
    _id: string
  }
  

export type InternalMethod = (req: any) => Promise<AssertionResponse>



export default class APIController {

    
    constructor(public mongoDB:ExtensibleDB){
         
    }

    getRoutes() : Route[]{
        return [] 
    }

    getControllerName() : string {
        return 'api'
    }
   

}