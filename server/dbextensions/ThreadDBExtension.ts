
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import {MongoRecord} from "./MongoDBExtension"
 
  export interface Thread extends MongoRecord{
    name:  string,
    
    parentUserId: string,
    parentCategoryId:string,
    
    title:string,

    primaryPostId:string,

    createdAt:string,


    status: string //can be disabled temporarily 
  }

 
  export interface Post extends MongoRecord{
    parentUserId: string,
    parentThreadId: string,

    body:  string, 

    createdAt:string, //for ordering 
    updatedAt:string,


    status: string //can be disabled temporarily 
  } 

    

  export const ThreadSchema = new Schema<Thread>({ 
    name:  { type: String, index: true, unique: true },

    parentUserId: {type:String, required:true},
    parentCategoryId: {type:String, required:true},
    
    title: {type: String, required:true} , ///not required

    primaryPostId: {type:String, required: true},

    createdAt: {type:String},

    status: String 
  })

 

  export const PostSchema = new Schema<Post>({    
    parentUserId: {type:String, required:true},

    parentThreadId: { type: String, index:true, required: true },  
    
    body:  { type: String, required:true, index:true, unique:true  }, 
      
    createdAt: {type:String},
    updatedAt: {type:String},

    status: String 
  })
 
 

  export const ThreadDefinition:TableDefinition= {tableName:'threads',schema:ThreadSchema}
  export const PostDefinition:TableDefinition= {tableName:'posts',schema:PostSchema}
 

export default class ThreadDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          ThreadDefinition,
          PostDefinition 
        ]
    } 
    

}