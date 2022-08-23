import ExtensibleMongoDB from "extensible-mongoose";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
import fs from 'fs'
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

const ERC721ABI = require('../../server/abi/ERC721ABI.json')


require('dotenv').config()


let RPCURL = process.env.RPC_URL


export async function scrapeDataLocal(args:string[], mongoDB:ExtensibleMongoDB){
 
   
    
    let inputjson = fs.readFileSync('server/tasks/data/inputassets.json','utf8')

    let inputdata = JSON.parse(inputjson)

    //@ts-ignore
    let digitalAssetController = new DigitalAssetController(mongoDB, {})

 

    
    for (let row of inputdata){
  

            let name = row.title

            
            let nameSimple = row.title.trim()

            let tokenId = row.tokenId

            let provider = new JsonRpcProvider(RPCURL)

            try{

            let tokenContract = new ethers.Contract(row.contractAddress, ERC721ABI, provider)

 
            let metadataURI = await tokenContract.tokenURI(tokenId)
           
            
                let newAssetResponse = await digitalAssetController.insertNewDigitalAsset({
                    parentUserId: undefined,
                    title: nameSimple,
                    contractAddress: row.contractAddress ,
                    primaryTokenId: row.tokenId,
                    metadataURI

                })

                let newAsset = newAssetResponse.data 

                console.log({newAsset})

                await digitalAssetController.updateDigitalAsset(
                    {assetId: newAsset._id,modifyParams:{status:'active'}} 
                )


            }catch(e){
                console.error(e)
            }
       

            await sleep(1000)
        

    }

   
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

    

}