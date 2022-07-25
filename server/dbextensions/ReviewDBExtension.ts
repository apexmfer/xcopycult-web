
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import {MongoRecord} from "./MongoDBExtension"
 
  export interface Review extends MongoRecord{
    
    //reviewer
    parentUserId: string,
   
    //polymorphic association
    parentType:string, //['redirect']
    parentId:string,//'https://url.com'
    
    score:string,

    status: string //can be disabled temporarily 
  }
 

  export const ReviewSchema = new Schema<Review>({ 
    
    parentUserId: {type:String, required:true},
    
    score: {type: String } , ///not required

    parentType: {type:String, required: true},

    parentId: {type:String, required: true},

    status: String 
  })

  
 
 

  export const ReviewDefinition:TableDefinition= {tableName:'reviews',schema:ReviewSchema}
  
export default class ReviewDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          ReviewDefinition
        ]
    } 
    

}