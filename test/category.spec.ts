
import chai, { expect } from 'chai'
import { Wallet } from 'ethers'
import ExtensibleMongooseDatabase, { DatabaseExtension } from 'extensible-mongoose' 
 
import {getTestDatabase} from "./helpers/test-utils" 
import AppHelper from '../server/lib/app-helper'
import { findRecordById } from '../server/lib/mongo-helper'
import ImageDBExtension, { AttachedImage, AttachedImageDefinition } from '../server/dbextensions/ImageDBExtension'
import AttachedImageController from '../server/controllers/AttachedImageController' 
import CategoryDBExtension from '../server/dbextensions/CategoryDBExtension'
import { DegenAuthExtension } from 'degen-auth' 
import { mongoIdToString } from '../server/lib/parse-helper'
import CategoryController from '../server/controllers/CategoryController'

 
import {describe, it} from 'mocha'
 
describe('Category Controller',    () => {
 
        let categoryController:CategoryController
        let mongoDB

        beforeEach(async () => {

            mongoDB  = await getTestDatabase()
            await mongoDB.dropDatabase()
            
            categoryController = new CategoryController(mongoDB)
     
          
            let dbExtensions:Array<DatabaseExtension> = []
    
            dbExtensions.push(...[ 
              new CategoryDBExtension(mongoDB),
            
            ])
 
            dbExtensions.map(ext => ext.bindModelsToDatabase())
        

        })


        afterEach(async () => {
            await mongoDB.disconnect()
        })
        
        it('should create a category', async () => {


            let created = await categoryController.createCategory( 
                { fields: { 
                name:"aliens",
                parentCategoryId:"testId"

            } } )
  
            console.log({created})
  
            expect(created.success).to.eql(true) 
            

        })


     

 

})

