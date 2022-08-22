import axios from "axios";
import ExtensibleMongoDB from "extensible-mongoose";
import { mongo } from "mongoose";
import AttachedImageController from "../controllers/AttachedImageController";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import FileHelper from "../lib/file-helper";
import { findRecord } from "../lib/mongo-helper";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
 
export async function fetchAssetMetadata( args: string[], mongoDB:ExtensibleMongoDB){
 
    const options = { 

       
    }  

    let active = true 

     
    
    while(active){


        //find the next DigitalAsset record with a metadata url but a null metadata cached 

        //download the metadata and save it to cached 

        //download the image and save it and attach it 

        let nextAsset = await findRecord( { 
            metadataURI: {$exists: true}, 
            metadataCached: {$exists: false} }, 
            DigitalAssetDefinition, mongoDB )

        if(!nextAsset.success || !nextAsset.data)  {
            active = false
            break 
            
        }

        console.log('next asset', nextAsset.data )


        let uri = nextAsset.data.metadataURI 

        //@ts-ignore
        let digitalAssetController = new DigitalAssetController(mongoDB, {}) 

        try{

        let response = await resolveGetQueryAsserted(uri,options)

        console.log({response})
    
        let stringifiedResponse = JSON.stringify(response) 
 
      
        let updateResponse = await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: {
                 metadataCached: stringifiedResponse ,
                 description: response.description}  
        }) 

        console.log({updateResponse})


        let imageURL = response.image 
        
        let downloadedImageDataBuffer:Buffer = await FileHelper.downloadImageToBinary(  imageURL )
 

        let newImageRecord = await AttachedImageController.uploadNewImage( downloadedImageDataBuffer, mongoDB  )
        let attach = await AttachedImageController.attachImage(newImageRecord.data._id, "digitalasset", nextAsset.data._id , mongoDB)

        console.log({newImageRecord})
        console.log({attach})
        //link image to this asset 


    }catch(e){
        
        await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: { metadataCached: JSON.stringify({error:"count not fetch metadata"}) }  
        }) 

        console.error(e)
    }


        await sleep(1000)


    }   

    console.log('finished task')

   

}


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
