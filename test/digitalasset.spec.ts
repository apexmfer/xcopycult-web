
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
import { UserSessionDefinition } from '../server/dbextensions/UserDBExtension'
import UserSessionController from '../server/controllers/UserSessionController'
import UserController from '../server/controllers/UserController'

describe('Digital Asset Controller',    () => {
  
        let digitalAssetController:DigitalAssetController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()        

            let userController = new UserController(mongoDB)
            
            let userSessionController = new UserSessionController(mongoDB,userController)


            userSessionController.validateSessionTokenParam  = async () => {
                return {success:true, data:{userId:1}}
            }

            digitalAssetController = new DigitalAssetController(mongoDB, userSessionController)
            
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[
              new DigitalAssetDBExtension(mongoDB),
           
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should create a digital asset ', async () => {

            let sessionToken = 'testtoken'

            let created = await digitalAssetController.createDigitalAsset( 
                { fields: {
                title:"The Doomed",
                contractAddress:"0xb1000",
                primaryTokenId:'12',
                metadataURI: "ipfs://",
                sessionToken
               
            } } )
  
            console.log({created})
  
            expect(created.success).to.eql(true) 
            

        })

   
     

 

})

