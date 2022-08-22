import ExtensibleMongoDB from "extensible-mongoose";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
import fs from 'fs'

require('dotenv').config()
export async function parseSuperrareInput(args:string[], mongoDB:ExtensibleMongoDB){
 

    let inputcsv = fs.readFileSync('server/tasks/data/superrareinput.csv','utf8')


    let formattedInput = inputcsv.replace('\'','').replace('\'','').replace('\'','')
 
    let lines = formattedInput.split('\n')

    let output:any[] = []
    

    for(let line of lines){

        let elements = line.split(',')

        let row = {
            title:removeQuotes(elements[0]).trim(),
            tokenId:removeQuotes(elements[1]).trim(),
            contractAddress:removeQuotes(elements[2]).trim()
        }

        output.push(row) 

     
        

    }

    
    


    fs.writeFileSync('server/tasks/data/inputassets.json',JSON.stringify(output))


        console.log(output)
    

}


function removeQuotes(input:string){

    return input.replace('\'','').replace('\'','').replace('\'','')
}