
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 


export interface DigitalAsset {
    title:  string,
    creator: string, 

    networkName: string,
    contractAddress: string,
    primaryTokenId: string,


    metadataURI:  string,
    metadataCached:string,
    description:string, 


    thumbnailImageId: string, 
    primaryImageId: string,

    status: string
  }
  

export interface DigitalToken {
  digitalAssetId:string,
  tokenId: string, 

}



  export const DigitalAssetSchema = new Schema<DigitalAsset>({    
    title:  { type: String, index: true, unique: true, required:true  },
    creator: {type: String},
    networkName: {type: String},
    contractAddress: {type: String,required:true },
    primaryTokenId: {type:String},
    
    metadataURI: {type: String},
    metadataCached: {type: String},

    description: {type: String},
    thumbnailImageId: {type: String},
    primaryImageId: {type: String},

    status: {type: String}
   
  })
 


  export const DigitalTokenSchema = new Schema<DigitalToken>({    
    digitalAssetId:  { type: String, index: true,  required:true  },
  
    tokenId: {type: String,required:true },
    
   
  })
  

  export const DigitalAssetDefinition:TableDefinition={tableName:'digitalassets',schema:DigitalAssetSchema}

  export const DigitalTokenDefinition:TableDefinition={tableName:'digitaltokens',schema:DigitalTokenSchema}

 
 

export default class DigitalAssetDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          DigitalAssetDefinition,
          DigitalTokenDefinition
        ]
    } 
    

}