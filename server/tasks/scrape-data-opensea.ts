import ExtensibleMongoDB from "extensible-mongoose";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";


require('dotenv').config()
export async function scrapeDataOpensea(args:string[], mongoDB:ExtensibleMongoDB){
 
    const options = { 

        headers:{
            "X-API-KEY": process.env.OPENSEA_API_KEY
        }
    }  

    let active = true 

    let nextCursor = undefined 
    
    while(active){

        let query = args[0]

        let uri = "https://api.opensea.io/api/v1/assets?"
        uri = uri.concat(`collection=${query}`)
        uri = uri.concat("&limit=50")
        
        if(nextCursor){
            uri = uri.concat(`&cursor=${nextCursor}`)
        }

        let response = await resolveGetQueryAsserted(uri,options)

        console.log({response})

        if(!response.success){
            continue
        }
    
        nextCursor = response.data.next 

        let assets = response.data.assets

        //console.log(JSON.stringify(assets))

        //@ts-ignore
        let digitalAssetController = new DigitalAssetController(mongoDB, {})

        for(let asset of assets){

            let name = asset.name 
            let nameSimple = asset.name.split('#')[0].trim()

            let image_url = asset.image_url
            let image_preview_url = asset.image_preview_url 

            try{
                await digitalAssetController.insertNewDigitalAsset({
                    parentUserId: undefined,
                    title: nameSimple,
                    contractAddress: asset.asset_contract.address ,
                    primaryTokenId: asset.token_id,
                    metadataURI: asset.token_metadata 

                })
            }catch(e){
                console.error(e)
            }
        }


        await sleep(1000)


    }

   
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

    

}