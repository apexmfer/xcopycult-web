
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
import {MongoRecord} from "./MongoDBExtension"

export interface User extends MongoRecord {
    email?:  string,
    publicAddress?:  string,

    lastSeen: string,
    createdAt: string    
  }
  


export interface UserSession extends MongoRecord {
  parentUserId:  string,
  
  sessionToken: string,


  lastUsed: string,
  createdAt: string    
}

   
   

  export const UserSchema = new Schema<User>({    
    email:  { type: String, index: true, unique: true },
    publicAddress: { type: String, index: true, unique: true },
    lastSeen: { type: String },
    createdAt: { type: String }
  })
 

  export const UserSessionSchema = new Schema<UserSession>({    
    parentUserId:  { type: String, index: true },
    sessionToken: { type: String, index: true, unique: true },
    lastUsed: { type: String },
    createdAt: { type: String }
  })
 

  export const UserDefinition:TableDefinition={tableName:'users',schema:UserSchema}

  export const UserSessionDefinition:TableDefinition={tableName:'usersessions',schema:UserSessionSchema}
 

export default class UserDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
            UserDefinition,UserSessionDefinition
        ]
    } 
    

}