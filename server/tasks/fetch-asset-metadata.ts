import axios from "axios";
import ExtensibleMongoDB from "extensible-mongoose";
import { mongo } from "mongoose";
import AttachedImageController from "../controllers/AttachedImageController";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import FileHelper from "../lib/file-helper";
import { findRecord, modifyRecord, modifyRecords } from "../lib/mongo-helper";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
 
import fs from 'fs'

const gifResize = require('@gumlet/gif-resize'); 

export async function fetchAssetMetadata( args: string[], mongoDB:ExtensibleMongoDB){
 
    const options = { 

       
    }  

    let active = true 


    try{
        fs.mkdirSync('../../dist/imagestorage')
    }catch(e){}

     
    const errorMessage = "Could not fetch metadata"
    
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


        let uri = formatURI(nextAsset.data.metadataURI )

        //@ts-ignore
        let digitalAssetController = new DigitalAssetController(mongoDB, {}) 

        try{

        let response = await resolveGetQueryAsserted(uri,options)

        console.log({response})
        
        if(!response.success){
            
            continue 
        }
        
        let remoteImageTitle:string = response.data.image ? response.data.image : response.data.imageURL
        let extension:string = remoteImageTitle ? remoteImageTitle.substring(remoteImageTitle.lastIndexOf('.')) : '.gif'

        console.log({extension})

        let stringifiedResponse = JSON.stringify(response) 
 
      
        let updateResponse = await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: {
                 name: response.data.name,
                 metadataCached: stringifiedResponse ,
                 description: formatDescription(response.data.description)}  
        }) 

        console.log({updateResponse})

        let imageTitle = nextAsset.data.title 


        let imageURL = formatURI(response.data.image )
        
        let downloadedImageDataBuffer:Buffer = await FileHelper.downloadImageToBinary(  imageURL )
        
        let resizedImageBuffer:Buffer = await new Promise( (resolve,reject) => {

             gifResize(
                {  width: 260 }
                )(downloadedImageDataBuffer).then(data => {
                    resolve(data)
                }  )


        })
         

        let newImageRecord = await AttachedImageController.uploadNewImage( downloadedImageDataBuffer, imageTitle, extension, 'primary', mongoDB  )
        let attach = await AttachedImageController.attachImage(newImageRecord.data._id, "digitalasset", nextAsset.data._id , mongoDB)
        

        console.log({newImageRecord})
        console.log({attach})

        let newThumbnailImageRecord = await AttachedImageController.uploadNewImage( resizedImageBuffer, imageTitle, extension, 'thumbnail', mongoDB  )
        let attachThumbnail = await AttachedImageController.attachImage(newThumbnailImageRecord.data._id, "digitalasset", nextAsset.data._id , mongoDB)


        console.log({newThumbnailImageRecord})
        console.log({attachThumbnail})
        //link image to this asset 


    }catch(e){

        console.error(e)

        await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: { metadataCached: errorMessage }  
        }) 

       
    }


        await sleep(1000)


    }   

    //reset marked records back to undefined 
    await modifyRecords({metadataCached:errorMessage},{$unset:{metadataCached:""}}, DigitalAssetDefinition, mongoDB)

    console.log('finished task')

   

}

function formatURI( input: any ){

    if(input.startsWith('ipfs://')) {

        let ipfsHash = input.substring( input.lastIndexOf('/'))

        return `https://ipfs.io/ipfs/${ipfsHash}`
    }

    return input 
}


function formatDescription(input:any){

    if(input && Array.isArray(input)){

        let output = ''

        for(let row of input){
            output = output.concat(row)
        }

        //output = output.replace('\n','')


        return output 
    }
  
    return input 
}


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
