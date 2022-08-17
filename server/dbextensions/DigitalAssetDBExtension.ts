
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 

export interface DigitalAsset {
    title:  string,
    creator: string, 

    networkName: string,
    contractAddress: string,
    tokenId: string, 


    metadataURI:  string,
    description:string, 


    thumbnailImageId: string, 
    primaryImageId: string
  }
  

  export const DigitalAssetSchema = new Schema<DigitalAsset>({    
    title:  { type: String, index: true, unique: true, required:true  },
    creator: {type: String},
    networkName: {type: String},
    contractAddress: {type: String,required:true },
    tokenId: {type: String,required:true },
    metadataURI: {type: String},
    description: {type: String},
    thumbnailImageId: {type: String},
    primaryImageId: {type: String},
   
  })
 


  export const DigitalAssetDefinition:TableDefinition={tableName:'digitalassets',schema:DigitalAssetSchema}

 
 

export default class CategoryDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          DigitalAssetDefinition 
        ]
    } 
    

}