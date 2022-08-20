import axios from "axios";
import ExtensibleMongoDB from "extensible-mongoose";
import { mongo } from "mongoose";
import AttachedImageController from "../controllers/AttachedImageController";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import { findRecord } from "../lib/mongo-helper";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
 
export async function fetchAssetMetadata(  mongoDB:ExtensibleMongoDB){
 
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
 
      
        await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: {
                 metadataCached: stringifiedResponse ,
                 description: response.description}  
        }) 


        let imageURL = response.image 

        let downloadedImageData = downloadImageToBinary(  imageURL )

        console.log({downloadedImageData})

        let newImageRecord = await AttachedImageController.uploadNewImage( downloadedImageData, mongoDB  )
        await AttachedImageController.attachImage(newImageRecord.data._id, "digitalasset", nextAsset.data._id , mongoDB)


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

   
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function downloadImageToBinary(imageURL){

    return new Promise( (resolve,reject) => {
      axios.get(imageURL,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            })
            .then((response) => {

                resolve(new Blob([response.data]))
                
            })
            .catch((error) => reject(error));

    })

}

    

}