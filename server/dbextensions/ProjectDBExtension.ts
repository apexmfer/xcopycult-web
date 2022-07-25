
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 

export interface Project {
    name:  string,
    urlSlug:  string,
   
    adminAddress: string,
  }
  
   
   

  export const ProjectSchema = new Schema<Project>({    
    name:  { type: String, index: true, unique: true },
    urlSlug: { type: String, index: true, unique: true },
   
    adminAddress: { type: String, index: false, unique: false },
  })
 


  export const ProjectDefinition:TableDefinition={tableName:'projects',schema:ProjectSchema}

 
 

export default class ProjectDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
            ProjectDefinition 
        ]
    } 
    

}