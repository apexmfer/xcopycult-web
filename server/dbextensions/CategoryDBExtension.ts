
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 

export interface Category {
    name:  string,
    urlSlug:  string,
  }
  

  export const CategorySchema = new Schema<Category>({    
    name:  { type: String, index: true, unique: true, required:true  },
    urlSlug: { type: String, index: true, unique: true , required: true }, 
  })
 


  export const CategoryDefinition:TableDefinition={tableName:'categories',schema:CategorySchema}

 
 

export default class CategoryDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
            CategoryDefinition 
        ]
    } 
    

}