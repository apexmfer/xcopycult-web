
import chai, { expect } from 'chai'
import { Wallet } from 'ethers'
import ExtensibleMongooseDatabase, { DatabaseExtension } from 'extensible-mongoose' 
 
import {getTestDatabase} from "./helpers/test-utils" 
import AppHelper from '../server/lib/app-helper'
import { findRecordById } from '../server/lib/mongo-helper'
import ImageDBExtension, { AttachedImage, AttachedImageDefinition } from '../server/dbextensions/ImageDBExtension'
import AttachedImageController from '../server/controllers/AttachedImageController' 
import EndpointDBExtension from '../server/dbextensions/EndpointDBExtension'
import { DegenAuthExtension } from 'degen-auth' 
import { mongoIdToString } from '../server/lib/parse-helper'
import EndpointController from '../server/controllers/EndpointController'

 
import {describe, it} from 'mocha'
import SlugController from '../server/controllers/SlugController'

describe('Slug Controller',    () => {
 
        let slugController:SlugController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            slugController = new SlugController(mongoDB)
     
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[
              new DegenAuthExtension(mongoDB),
              new EndpointDBExtension(mongoDB),
            
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should create a slug', async () => {


            let created = await slugController.createSlug( 
                { fields: { 
                parentEndpointId:"testId"

            } } )
  
            console.log({created})
  
            expect(created.success).to.eql(true) 
            

        })


     

 

})

