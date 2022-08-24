 
//import ToadzShopDB, { ShopItem }  from "../lib/toadz-shop-db"
import AppHelper from "../lib/app-helper";

import ExtensibleDB from 'extensible-mongoose'
  
import FileHelper from "../lib/file-helper";

import {findRecordById, findRecords, modifyRecord} from "../lib/mongo-helper"

import { AttachedImage, AttachedImageDefinition, AttachedImageSchema } from "../dbextensions/ImageDBExtension";
import { AssertionResponse, ControllerMethod } from "degen-route-loader";
import APIController from "./APIController";
import APIHelper from "../lib/api-helper";
import { ImageMetadata } from "../dbextensions/ImageDBExtension";
import { escapeString, stringToMongoId, unescapeString } from "../lib/parse-helper";


const crypto = require('crypto');
const hashingSecret= process.env.HASH_SECRET ? process.env.HASH_SECRET : "hashingSecret"


var sizeOf = require('buffer-image-size');

const MAX_FILE_SIZE = 10485760 //bytes //10MB
const MAX_ATTACHED_IMAGES_PER_ITEM = 6

export interface FileValidation  {
  name: string,
  value?: any 

}

export default class AttachedImageController extends APIController {

  


  getControllerName() : string {
      return 'attachedimage'
  }

 
    /*
      Starts out unattached, 
    */
   /*
  createImage: ControllerMethod = async (req:any )=> {
     
    let publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress, 'publicaddress')
 
  

    let allFiles = Object.entries(req.files)

 

    let firstFileData = allFiles[0]

    let firstFileName = firstFileData[0]
    let firstFile = firstFileData[1]
 

    let insertedImageFile = await AttachedImageController.uploadNewImage( firstFile,   this.mongoDB  )

    console.log('image file response',insertedImageFile)
    


    return  insertedImageFile
   

}

*/

getImages: ControllerMethod = async (req:any ) => {

        

  let imageIds = APIHelper.sanitizeInput( req.fields.imageIds , 'string[]')
   
  let adminAddress = APIHelper.sanitizeInput(req.fields.adminAddress, 'publicaddress')  


  let query = {} 

  if(imageIds){
      let mongoItemIds: string[] =  imageIds.map(x => stringToMongoId(x))

      query['_id'] = {$in: mongoItemIds} 
  }
  
  if(adminAddress){
      query['adminAddress']=adminAddress

      //do a join with parentShopId to find ?? 
  }


  let imagesResponse = await findRecords( query , AttachedImageDefinition , this.mongoDB)

  if(!imagesResponse.success){
      return imagesResponse
  }

  let imagesData = await Promise.all(imagesResponse.data.map( 
       x => {return  AttachedImageController.getAttachedImageRenderData(x)}))

  return   {success:true, data: imagesData} 


}



static async uploadNewImageFromFile(fileData: any,  tagname:string, mongoDB: ExtensibleDB) : Promise<AssertionResponse>  {

  let fileName = fileData.name 

  let fileDataBinary

  try{         
    fileDataBinary = await FileHelper.getFileDataBinary(fileData)
  }catch(error){
      console.error(error)
      return {success:false, error:`Could not read file ${fileName}  `  }
  }


  let title = fileName.substring(0,fileName.lastIndexOf('.'))
  let extension:string = fileName.substring(fileName.lastIndexOf('.'))



  return await AttachedImageController.uploadNewImage( fileDataBinary, title,extension, tagname, mongoDB  )
}
         


 static async uploadNewImage(
   fileDataBuffer: Buffer, 
   title:string, 
   extension:string, 
   tagname:string,
   mongoDB: ExtensibleDB) : Promise<AssertionResponse>  {
          
 
 

    // Calling createHash method
    const hash = crypto.createHash('sha256', hashingSecret)
                        
    // updating data
    .update(fileDataBuffer)

    // Encoding to be used
    .digest('hex');

    if(!extension.endsWith('png') 
    && !extension.endsWith('gif')
    && !extension.endsWith('jpg')
    && !extension.endsWith('jpeg')){
      extension = '.gif'
    }


    let fileName = hash.concat(extension)

    let imageStorageFolder:string = "/imagestorage/"

    let fullFilePath = await FileHelper.writeBufferToFile( 
      fileDataBuffer, imageStorageFolder.concat(fileName))

    console.log( { fullFilePath});  

    let metadata = await AttachedImageController.getImageMetadata(fileName,title,fileDataBuffer)
 

    let recordCreate = await AttachedImageController.insertNewUploadedImageRecord(
      fileName , metadata,  hash, tagname, mongoDB)
  
    return recordCreate
   

  //return {success:false, error:'unknown error' }



} 

  
    static async attachImage( imageId : string,  parentType: string, parentId: string,  mongoDB: ExtensibleDB) {
           

      let validations: FileValidation[] = AppHelper.getImageUploadValidationsForDomain( parentType )

      let imageRecordResponse = await findRecordById( imageId,  AttachedImageDefinition, mongoDB)

      if(!imageRecordResponse.success){
        return imageRecordResponse
      }

      let imageRecord:AttachedImage = imageRecordResponse.data 

      if(imageRecord.status != 'detached'){
        return {success: false, error: 'Image attachment failed.'}
      } 
 

      let metadata = JSON.parse(imageRecord.metadata)

      let validationResponse = AttachedImageController.validateImageFile(metadata,validations)

      if(!validationResponse.success){
        return validationResponse
      }


      let update = {

        parentType,
        parentId,
        status: 'attached'

      }


      let updateResponse = await modifyRecord(imageId, update, AttachedImageDefinition, mongoDB )

      return updateResponse
  
  }



  
     
    static async insertNewUploadedImageRecord(
      filename:string, 
      metadata: ImageMetadata, 
      sha256_hash:string, 
      tagname:string,
      mongoDB: ExtensibleDB): Promise<AssertionResponse>{
  
       
      let metadataStringified = JSON.stringify(metadata)

        let result = await mongoDB.getModel(AttachedImageDefinition).create({
          filename,
          sha256_hash,
          tagname,
         // adminAddress: AppHelper.toChecksumAddress( adminAddress ) ,
          metadata: metadataStringified ,
          status:'detached'}) 

        .then((insert) => {
         return {success:true, data: insert }
        })
        .catch((error) => {
         console.error(error)
         return {success:false, error: 'Image insertion error'}
        }) 
 
 
        return result

    } 

 
    static async deleteUploadedImage( imageId: string, mongoDB: ExtensibleDB  ){
 

      let update = {
 
        status: 'deleted'

      } 


      //delete the file from cache folder  LATER  (culling bot )



      let updateResponse = await modifyRecord(imageId, update, AttachedImageDefinition, mongoDB )

      return updateResponse



    }
 

    static async getImageMetadata(fileName:string,title:string, fileBuffer:Buffer ) : Promise<ImageMetadata>{
       

      let imgBuffer:Buffer = fileBuffer //Buffer.from(fileDataBinary as string,'binary' ) 
       
      let imageDimensions = {width:0,height:0}

 
      try{
        imageDimensions = sizeOf( imgBuffer );
      }catch(err){ 
        console.error(err)
        // return {success:false, error:'Could not read file dimensions'}
      }

      //let combinedFileData = Object.assign( file, imageDimensions )

      return  {
        name: fileName,
        title,
        sizeBytes: imgBuffer.length,
        type: 'image',
        widthPixels: imageDimensions.width,
        heightPixels : imageDimensions.height  
      }
    }



/*

    static async getImageMetadata( fileBuffer:Buffer ) : Promise<ImageMetadata>{
       

      let imgBuffer:Buffer = await file.arrayBuffer() //Buffer.from(fileDataBinary as string,'binary' ) 
       
      let imageDimensions = {width:0,height:0}


      

 
      
      try{
        imageDimensions = sizeOf( imgBuffer );
      }catch(err){ 
        console.error(err)
        // return {success:false, error:'Could not read file dimensions'}
      }

      let combinedFileData = Object.assign( file, imageDimensions )

      return  {
        name: combinedFileData.name,
        sizeBytes: combinedFileData.size,
        type: combinedFileData.type,
        widthPixels: combinedFileData.width,
        heightPixels : combinedFileData.height  
      }
    }*/


    static validateImageFile(metadata: ImageMetadata, validations? : FileValidation[]) : AssertionResponse{

      if(!validations){
        validations = []
      } 


      let globalValidations = [
        {"name":"validName"},
        {"name":"maxFileSize","value":MAX_FILE_SIZE},
        {"name":"fileType","value":["image/png","image/jpeg"]}
      ]


      for(let val of validations.concat(globalValidations)){
        let validationResponse = AttachedImageController.assertFileValidation( metadata , val  )

        if(!validationResponse.success){
          return validationResponse
        }
      }



      return {success:true, error:undefined}
    }

    static assertFileValidation(metadata:ImageMetadata, validation:FileValidation ) : AssertionResponse  {

      let validationName = validation.name.toLowerCase()
      let validationValue = validation.value 

      if(validation.name == 'validname'){
        if(metadata.name != unescapeString(escapeString(metadata.name))) {
          return {success:false, error:'File name contains invalid characters'}
        }
      }

      if(validation.name == 'maxfilesize'){
        if(metadata.sizeBytes > validationValue){
          return {success:false, error:`File size must not exceed ${validationValue} bytes.`}
        }
      }
 
    
      if(validation.name == 'minWidth'){
        if(metadata.widthPixels < validationValue){
          return {success:false, error:`File width must be at least ${validationValue}`}
        }
      }

      if(validation.name == 'minHeight'){
        if(metadata.heightPixels < validationValue){
          return {success:false, error:`File height must be at least ${validationValue}`}
        }
      } 
    


      if(validation.name == 'filetype'){
        let matchingType = false 

        for(let validType of validationValue){
          if(metadata.type == validType){
            matchingType = true 
            break;
          }
        }

        if(!matchingType){
          return {success:false, error:'File type invalid'}
        }
      }
 
      return {success:true}
    }


    static async findAttachedImages(parentType:string, parentId:string, mongoDB: ExtensibleDB){

      return await mongoDB.getModel(AttachedImageDefinition).find({
        parentType, parentId 
      })

      
    }


    static async getAttachedImagesData(parentType:string, parentId:string, mongoDB: ExtensibleDB){

      let imagesList = await AttachedImageController.findAttachedImages(parentType,parentId, mongoDB)

      return await Promise.all( imagesList.map(x =>{ return AttachedImageController.getAttachedImageRenderData(x) } ))
      
      
    }

    


    static async getAttachedImageRenderData(img:any  ){
       return {
          filename: unescapeString(img.filename),
          metadata: unescapeString(img.metadata)
        
      }
    }


 
  

}