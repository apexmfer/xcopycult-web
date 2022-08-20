import ExtensibleMongoDB from "extensible-mongoose";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";


require('dotenv').config()
export async function scrapeDataOpensea(query, mongoDB:ExtensibleMongoDB){
 
    const options = { 

        headers:{
            "X-API-KEY": process.env.OPENSEA_API_KEY
        }
    }
 

    let uri = "https://api.opensea.io/api/v1/assets?"
    uri = uri.concat(`collection=${query.collectionName}`)
    uri = uri.concat("&limit=50")

    let response = await resolveGetQueryAsserted(uri,options)

    console.log({response})
 

    let assets = response.assets

    //console.log(JSON.stringify(assets))

     //@ts-ignore
    let digitalAssetController = new DigitalAssetController(mongoDB, {})

    for(let asset of assets){

        let name = asset.name 
        let nameSimple = asset.name.split('#')[0].trim()

        let image_url = asset.image_url
        let image_preview_url = asset.image_preview_url 

        await digitalAssetController.insertNewDigitalAsset({
            parentUserId: undefined,
            title: nameSimple,
            contractAddress: asset.asset_contract.address ,
            primaryTokenId: asset.token_id,
            metadataURI: asset.token_metadata



        })
    }
    

}