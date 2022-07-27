
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
import PostController from '../server/controllers/PostController'
import CategoryDBExtension from '../server/dbextensions/CategoryDBExtension'

describe('Endpoint Controller',    () => {
 
        let threadController:ThreadController
        let postController:PostController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            postController = new PostController(mongoDB)
            threadController = new ThreadController(postController,mongoDB)
     
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[
              new CategoryDBExtension(mongoDB),
              new ThreadDBExtension(mongoDB),
            
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should create a thread ', async () => {

            let created = await threadController.createThread( 
                { fields: {
                title:"testTitle",
                parentCategoryId:"testId",
                body:'testBody',
               
            } } )
  
            console.log({created})
  
            expect(created.success).to.eql(true) 
            

        })

        
        it('should get threads', async ()=> {

            let created = await threadController.createThread( 
                { fields: {
                title:"testTitle",
                parentCategoryId:"testId",
                body:'testBody',
               
            } } )

            let input = {}

           

            let response = await threadController.getThreads(input)

            expect(response.success).to.eql(true)

            expect(response.data.length).to.eql(1)
            console.log('endpoints response',response)
        })


     

 

})

