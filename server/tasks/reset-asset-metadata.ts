import axios from "axios";
import ExtensibleMongoDB from "extensible-mongoose";
import { mongo } from "mongoose";
import AttachedImageController from "../controllers/AttachedImageController";
import DigitalAssetController from "../controllers/DigitalAssetController";
import UserSessionController from "../controllers/UserSessionController";
import { DigitalAsset, DigitalAssetDefinition } from "../dbextensions/DigitalAssetDBExtension";
import FileHelper from "../lib/file-helper";
import {  deleteRecords, findRecord, modifyRecord, modifyRecords } from "../lib/mongo-helper";
import { resolveGetQueryAsserted } from "./lib/rest-api-helper";
 
import { formatDescription, formatURI } from "../lib/parse-helper";
import { AttachedImageDefinition } from "../dbextensions/ImageDBExtension";

 
export async function resetAssetMetadata( args: string[], mongoDB:ExtensibleMongoDB){
 
    

        let modify = await modifyRecords( 
             {} ,
             {$unset:{metadataCached:""}}, 
            DigitalAssetDefinition, mongoDB )
 
}
 

 