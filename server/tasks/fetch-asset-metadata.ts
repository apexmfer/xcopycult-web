import ExtensibleMongoDB from "extensible-mongoose";
import { mongo } from "mongoose";
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
        }

        console.log('next asset', nextAsset.data )


        let uri = nextAsset.data.metadataURI 
        
      
        let response = await resolveGetQueryAsserted(uri,options)

        console.log({response})
    
        let stringifiedResponse = JSON.stringify(response)



        //@ts-ignore
        let digitalAssetController = new DigitalAssetController(mongoDB, {})
  

         await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: { metadataCached: stringifiedResponse }  
        }) 


        await sleep(1000)


    }

   
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

    

}