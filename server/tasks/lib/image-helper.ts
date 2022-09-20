

import sharp from 'sharp'
const gifResize = require('@gumlet/gif-resize'); 


export async function resizeJpg(imgBuffer:Buffer) : Promise<Buffer> {
 
    return await sharp(imgBuffer) 
     .resize(260)
     .jpeg({ mozjpeg: true })
     .toBuffer()
     
 }
 
 export async function resizeGif( imgBuffer:Buffer ) : Promise<Buffer> {
     return new Promise( (resolve,reject) => {
 
         gifResize(
            {  width: 260 }
            )(imgBuffer).then(data => {
                resolve(data)
            }  )
 
 
    })   
 }
 