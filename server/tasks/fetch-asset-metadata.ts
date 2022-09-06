import axios from "axios";
import ExtensibleMongoDB from "extensible-mongoose";
import { mongo } from "mongoose";
import AttachedImageController from "../controllers/AttachedImageController";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { DigitalAsset, DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import FileHelper from "../lib/file-helper";
import { deleteRecord, deleteRecords, findRecord, modifyRecord, modifyRecords } from "../lib/mongo-helper";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
 
import fs from 'fs'
import path from 'path'

import sharp from 'sharp'
import { AttachedImageDefinition } from "../dbextensions/ImageDBExtension";

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

        let assetData:DigitalAsset = nextAsset.data 

        let uri = formatURI(assetData.metadataURI )

        //@ts-ignore
        let digitalAssetController = new DigitalAssetController(mongoDB, {}) 

        try{

        let response = await resolveGetQueryAsserted(uri,options)

        console.log({response})
        
        if(!response.success){
            
            continue 
        }
        
        //let remoteImageTitle:string = response.data.image ? response.data.image : response.data.imageUrl

        let mediaType = assetData.mediaType ? assetData.mediaType : 'gif'

        let extension:string = '.'.concat(mediaType)

        console.log({extension})

        let stringifiedResponse = JSON.stringify(response.data) 
 
      
        let updateResponse = await digitalAssetController.updateDigitalAsset({
            assetId: nextAsset.data._id,
            modifyParams: {
                 name: response.data.name,
                 metadataCached: stringifiedResponse ,
                 description: formatDescription(response.data.description)}  
        }) 

        console.log({updateResponse})

        let imageTitle = assetData.title 

        
        let downloadedImageDataBuffer:Buffer

        if(assetData.localMedia){

            let localFile = await FileHelper.readLocalFile( path.resolve('server/tasks/assets/',assetData.localMedia )  ,'binary')
            downloadedImageDataBuffer = Buffer.from(localFile,'binary')

        }else{
            let imageURL = response.data.image ? formatURI(response.data.image ) :  formatURI(response.data.imageUrl )
        
            downloadedImageDataBuffer = await FileHelper.downloadImageToBinary(  imageURL )
            
        }
        

      

        let attachableImages:{attachableType:string,imageBuffer:Buffer}[] = [] 

        if(mediaType == 'gif'){

            attachableImages.push( {

                attachableType: 'primary',
                imageBuffer: downloadedImageDataBuffer
            }  )

            let resizedImageBuffer:Buffer = await resizeGif(downloadedImageDataBuffer)
            
            if(downloadedImageDataBuffer.compare(resizedImageBuffer) == 0){
                throw new Error('WARNING: resized image is the same')
            }

            attachableImages.push( {

                attachableType: 'thumbnail',
                imageBuffer: resizedImageBuffer
            }  )

        }

       

        if(mediaType == 'jpg'){

            attachableImages.push( {

                attachableType: 'primary',
                imageBuffer: downloadedImageDataBuffer
            }  )

             
            let resizedImageBuffer:Buffer = await resizeJpg(downloadedImageDataBuffer)

            if(downloadedImageDataBuffer.compare(resizedImageBuffer) == 0){
                throw new Error('WARNING: resized image is the same')
            }

            attachableImages.push( {

                attachableType: 'thumbnail',
                imageBuffer: resizedImageBuffer
            }  )

        }
        await deleteRecords({status:'detached'},AttachedImageDefinition,mongoDB)

        await deleteRecords({parentId:nextAsset.data._id},AttachedImageDefinition,mongoDB)


        for(let attachable of attachableImages){
           
            
                let newImageRecord = await AttachedImageController.uploadNewImage( attachable.imageBuffer, imageTitle, extension, attachable.attachableType, mongoDB  )
            
                let attach = await AttachedImageController.attachImage(newImageRecord.data._id, "digitalasset", nextAsset.data._id , mongoDB)    
                console.log({attach})
           
         }

      


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

async function resizeJpg(imgBuffer:Buffer) : Promise<Buffer> {
imgBuffer
   return await sharp(imgBuffer) 
    .resize(260)
    .jpeg({ mozjpeg: true })
    .toBuffer()
    
}

async function resizeGif( imgBuffer:Buffer ) : Promise<Buffer> {
    return new Promise( (resolve,reject) => {

        gifResize(
           {  width: 260 }
           )(imgBuffer).then(data => {
               resolve(data)
           }  )


   })   
}

function formatURI( input: any ){

    input = input.replace('https://ipfs.infura.io/ipfs/','https://infura-ipfs.io/ipfs/')

    if(input && input.startsWith('ipfs://ipfs/')) {

        //let ipfsHash = input.substring( input.lastIndexOf('/'))

        return input.replace('ipfs://ipfs/','https://ipfs.io/ipfs/')   
    }

    if(input && input.startsWith('ipfs://')) {

        //let ipfsHash = input.substring( input.lastIndexOf('/'))

        return input.replace('ipfs://','https://ipfs.io/ipfs/')   
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
  
