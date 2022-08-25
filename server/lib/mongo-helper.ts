import { AssertionResponse } from "degen-route-loader"
 
import ExtensibleDB, { TableDefinition } from 'extensible-mongoose'
import AppHelper from "./app-helper"
import { stringToMongoId } from "./parse-helper"
 


export async function findRecordById( id: string, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{

    let item = await mongoDB.getModel(definition).findById( stringToMongoId(id) )
    
    if(!item){
        return {success:false, error:`Could not find ${definition.tableName}`}
    }

    return {success:true, data: item}
}


export async function findRecord( query: any, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{

    let items = await mongoDB.getModel(definition).findOne( query )
    
    if(!items ){
        return {success:false, error:`Could not find record for ${definition.tableName}`}
    }

    return {success:true, data: items}
}

export async function findRecords( query: any, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{



    let items = await mongoDB.getModel(definition).find( query ) 
    
    if(!items ){
        return {success:false, error:`Could not find records for ${definition.tableName}`}
    }

    items = items.filter(x => typeof x != 'undefined')

    return {success:true, data: items}
}


export async function findRecordsWithOptions( query: any, options:any, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
    
    let limit = 1000
    if(options.limit && !isNaN(options.limit)){
        limit = options.limit;
    }

    let offset = 0
    if(options.offset && !isNaN(options.offset)){
        offset = options.offset;
    }

    let items = await mongoDB.getModel(definition).find(query).skip(offset).limit(limit)
    
    if(!items ){
        return {success:false, error:`Could not find records for ${definition.tableName}`}
    }

    items = items.filter(x => typeof x != 'undefined')

    return {success:true, data: items}
}


export async function getRecordCount( query: any, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
    
    let count = await mongoDB.getModel(definition).count(query)
    

    return {success:true, data: count}
}


export async function createRecord( input: any, definition: TableDefinition, mongoDB: ExtensibleDB  ){

    let result = await mongoDB.getModel(definition).create(input)

    .then((insert) => {
        return {success:true, data: insert }
    })
    .catch((error) => {
        console.error(error)
        return {success:false,  error: `createRecord: Could not create ${definition.tableName}`}
    }) 

   return result

}

export async function modifyRecord( id: string, update: any , definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
 
    let options = {returnOriginal: false}

    let updatedRecord = await mongoDB.getModel(definition).findOneAndUpdate({ _id: stringToMongoId(id)  }, update, options )

    if(!updatedRecord){
        return {success:false, error:`Could not modify ${definition.tableName}`}
    }

    return {success:true, data: updatedRecord}
}


export async function modifyRecords( query:any, update: any , definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
 
    let options = { }

    let updatedRecords = await mongoDB.getModel(definition).updateMany(query, update, options )

    if(!updatedRecords){
        return {success:false, error:`Could not modify ${definition.tableName}`}
    }

    return {success:true, data: updatedRecords}
}




export async function deleteRecord( id: string,  definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
 
  
      let updatedRecord = await mongoDB.getModel(definition).findOneAndDelete({ _id: stringToMongoId(id)  } )
  
      if(!updatedRecord){
          return {success:false, error:`Could not modify ${definition.tableName}`}
      }
  
      return {success:true, data: updatedRecord}
  }
  
  