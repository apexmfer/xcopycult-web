
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 
export interface FileMetadata {
    name:string,
    sizeBytes: number, 
    type:string
}
 

export interface ImageMetadata extends FileMetadata { 
  title:string,
  widthPixels: number,
  heightPixels: number 
}

  export interface AttachedImage {
    filename:  string,
    title:string,

    tagname:string, //like   thumbnail

    metadata: string,  //stringified 
    sha256_hash: string,

    adminAddress: string,
     
    parentType: string,
    parentId: string,

    status: string
  
  }
 

  export const  AttachedImageSchema = new Schema<AttachedImage>({    
    filename:  { type: String, index: true, unique: true },
    title:String,
    tagname:String,
    metadata: String ,
    sha256_hash: String,
    adminAddress: { type: String  },
    parentType: { type: String  },
    parentId: { type: String  },
    status:   { type: String, required:true } 

  })

 

  export const AttachedImageDefinition:TableDefinition= {tableName:'attachedimages',schema:AttachedImageSchema}


export default class ImageDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
           AttachedImageDefinition
        ]
    } 
    

}