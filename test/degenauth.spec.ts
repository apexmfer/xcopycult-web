
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
import DegenAuthController from '../server/controllers/DegenAuthController'
 
describe('Degen Auth Controller',    () => {
  
        let degenAuthController:DegenAuthController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            degenAuthController = new DegenAuthController(mongoDB)
            
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[
              new DegenAuthExtension(mongoDB),
           
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should generate a challenge  ', async () => {

            let created = await degenAuthController.generateChallenge( 
                { fields: {
                publicAddress:"0xB11ca87E32075817C82Cc471994943a4290f4a14" 
               
            } } )
   
            expect(created.success).to.eql(true) 
            

        })

         
        it('should generate a user session  ', async () => {

            let userWallet = Wallet.createRandom()

            let challengeResponse = await degenAuthController.generateChallenge( 
                { fields: {
                publicAddress:userWallet.address
               
            } } )
  
            let challenge = challengeResponse.data.challenge


            let signature = await userWallet.signMessage(challenge)


            let userSessionResponse = await degenAuthController.generateUserSession({
                fields:{
                    publicAddress: userWallet.address,
                    signature
                }
            })

             
            expect(userSessionResponse.success).to.eql(true)

        })


        it('should validate a user session  ', async () => {

            let userWallet = Wallet.createRandom()

            let challengeResponse = await degenAuthController.generateChallenge( 
                { fields: {
                publicAddress:userWallet.address
               
            } } )
  
            let challenge = challengeResponse.data.challenge


            let signature = await userWallet.signMessage(challenge)


            let userSessionResponse = await degenAuthController.generateUserSession({
                fields:{
                    publicAddress: userWallet.address,
                    signature
                }
            })

 

            let authToken = userSessionResponse.data.authToken
 


            let validationResponse = await degenAuthController.validateAuthToken({
                fields:{
                    publicAddress: userWallet.address,
                    authToken

                }
            })

            expect(validationResponse.success).to.eql(true)

        })

   
     

 

})

