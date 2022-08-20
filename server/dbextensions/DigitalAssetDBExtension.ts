
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 


export interface DigitalAsset {

    parentUserId: string, //the submitter 

    title:  string,
    creator: string, 

    networkName: string,
    contractAddress: string,
    primaryTokenId: string,


    metadataURI:  string,
    metadataCached?:string,
    description?:string, 


    thumbnailImageId?: string, 
    primaryImageId?: string,

    status: string,
    createdAt: string,
    updatedAt: string
  }
  

export interface DigitalToken {
  digitalAssetId:string,
  tokenId: string, 

}



  export const DigitalAssetSchema = new Schema<DigitalAsset>({  
    parentUserId: {type: String,  index:true },
    
    title:  { type: String, index: true, unique: true, required:true  },
    creator: {type: String},
    networkName: {type: String},
    contractAddress: {type: String,required:true },
    primaryTokenId: {type:String},
    
    metadataURI: {type: String, unique: true },
    metadataCached: {type: String},

    description: {type: String},
    thumbnailImageId: {type: String},
    primaryImageId: {type: String},

    status: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String}
   
  })
 


  export const DigitalTokenSchema = new Schema<DigitalToken>({    
    digitalAssetId:  { type: String, index: true,  required:true  },
  
    tokenId: {type: String,required:true },
    
   
  })
  

  export const DigitalAssetDefinition:TableDefinition={tableName:'digitalassets',schema:DigitalAssetSchema}

  export const DigitalTokenDefinition:TableDefinition={tableName:'digitaltokens',schema:DigitalTokenSchema}

 
 

export default class DigitalAssetDBExtension extends DatabaseExtension {
  
    constructor(mongoDB: ExtensibleMongoDatabase){
      super(mongoDB)

      DigitalTokenSchema.index( { "digitalAssetId": 1, "tokenId": 1 }, { unique: true } )

    }

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          DigitalAssetDefinition,
          DigitalTokenDefinition
        ]
    } 
    

}