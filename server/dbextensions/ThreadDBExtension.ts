
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import {MongoRecord} from "./MongoDBExtension"
 
  export interface Thread extends MongoRecord{
    title:  string,
    urlSlug: string,
    
    parentUserId: string,
    parentCategoryId:string,
     
    primaryPostId:string,

    createdAt:string,


    status: string //can be disabled temporarily 
  }

 
  export interface Post extends MongoRecord{
    parentUserId: string,
    parentThreadId: string|undefined,

    body:  string, 

    createdAt:string, //for ordering 
    updatedAt:string,


    status: string //can be disabled temporarily 
  } 

    

  export const ThreadSchema = new Schema<Thread>({ 
    title:  { type: String, index: true, unique: true },
    urlSlug: { type: String, required:true},

    parentUserId: {type:String, required:true},
    parentCategoryId: {type:String, required:true},
    
    primaryPostId: {type:String, required: true},

    createdAt: {type:String},

    status: String 
  })

 

  export const PostSchema = new Schema<Post>({    
    parentUserId: {type:String, index:true, required:true},

    parentThreadId: { type: String, index:true   },  
    
    body:  { type: String    }, 
      
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