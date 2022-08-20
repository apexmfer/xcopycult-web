import ExtensibleMongoDB from "extensible-mongoose";
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

}