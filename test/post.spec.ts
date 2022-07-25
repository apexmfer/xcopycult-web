
import chai, { expect } from 'chai'
import { Wallet } from 'ethers'
import ExtensibleMongooseDatabase, { DatabaseExtension } from 'extensible-mongoose' 
 
import {getTestDatabase} from "./helpers/test-utils" 
import AppHelper from '../server/lib/app-helper'
import { findRecordById } from '../server/lib/mongo-helper'
import ImageDBExtension, { AttachedImage, AttachedImageDefinition } from '../server/dbextensions/ImageDBExtension'
import AttachedImageController from '../server/controllers/AttachedImageController' 
import  ThreadDBExtension from '../server/dbextensions/ThreadDBExtension'
import { DegenAuthExtension } from 'degen-auth' 
import { mongoIdToString } from '../server/lib/parse-helper'
import PostController from '../server/controllers/PostController'

 
import {describe, it} from 'mocha'
 
describe('Post Controller',    () => {
 
        let postController:PostController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            postController = new PostController(mongoDB)
     
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[
            
              new ThreadDBExtension(mongoDB),
            
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should create a post', async () => {


            let created = await postController.createPost( 
                { fields: { 
                parentThreadId:"testThreadId",
                body:"testBody"

            } } )
   
  
            expect(created.success).to.eql(true) 
            

        })


     

 

})

