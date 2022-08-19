
import chai, { expect } from 'chai'
import { Wallet } from 'ethers'
import ExtensibleMongooseDatabase, { DatabaseExtension } from 'extensible-mongoose' 
 
import {getTestDatabase} from "./helpers/test-utils" 
import AppHelper from '../server/lib/app-helper'
import { findRecordById } from '../server/lib/mongo-helper'
import ImageDBExtension, { AttachedImage, AttachedImageDefinition } from '../server/dbextensions/ImageDBExtension'
import AttachedImageController from '../server/controllers/AttachedImageController' 
import ThreadDBExtension from '../server/dbextensions/ThreadDBExtension'
import { DegenAuthExtension } from 'degen-auth' 
import { mongoIdToString } from '../server/lib/parse-helper'
import ThreadController from '../server/controllers/ThreadController'

 
import {describe, it} from 'mocha'
import { mongo } from 'mongoose'
import DigitalAssetController from '../server/controllers/DigitalAssetController'
import DigitalAssetDBExtension from '../server/dbextensions/DigitalAssetDBExtension'

describe('Endpoint Controller',    () => {
  
        let digitalAssetController:DigitalAssetController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            digitalAssetController = new DigitalAssetController(mongoDB)
            
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[
              new DigitalAssetDBExtension(mongoDB),
           
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should create a thread ', async () => {

            let created = await digitalAssetController.createDigitalAsset( 
                { fields: {
                title:"The Doomed",
                contractAddress:"0xb1000",
                primaryTokenId:'12',
                metadataURI: "ipfs://"
               
            } } )
  
            console.log({created})
  
            expect(created.success).to.eql(true) 
            

        })

   
     

 

})

