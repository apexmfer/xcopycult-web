
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
import { mongo } from 'mongoose'
import SlugController from '../server/controllers/SlugController'

describe('Endpoint Controller',    () => {
 
        let endpointController:EndpointController
        let slugController:SlugController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            slugController = new SlugController(mongoDB)
            endpointController = new EndpointController(slugController,mongoDB)
     
          
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
        
        it('should create an endpoint ', async () => {


            let created = await endpointController.createEndpoint( 
                { fields: {
                name:"testName",
                parentProjectId:"testId",
                actionType:'redirect',
                actionData:"https://google.com"

            } } )
  
            console.log({created})
  
            expect(created.success).to.eql(true) 
            

        })


        it('should get endpoints', async ()=> {

            let created = await endpointController.createEndpoint( 
                { fields: {
                name:"testName",
                parentProjectId:"testId",
                actionType:'redirect',
                actionData:"https://google.com"

            } } )


            const userData = {
                email:"john@test.com",
                _id:'test_session_id'
            }

            // getEndpoints

            let inputs = {
                validatedSessionUser: userData
            } 


            let response = await endpointController.getEndpoints(inputs)

            expect(response.success).to.eql(true)

            expect(response.data.length).to.eql(1)
            console.log('endpoints response',response)
        })


     

 

})

