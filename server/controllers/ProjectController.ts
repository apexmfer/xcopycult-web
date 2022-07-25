
 
 
import AppHelper from "../lib/app-helper";

import { AssertionResponse, ControllerMethod } from "degen-route-loader"

import web3utils from 'web3-utils'
import APIHelper from "../lib/api-helper";
import FileHelper from "../lib/file-helper";
import APIController from "./APIController" 
import AttachedImageController, { FileValidation } from "./AttachedImageController";

import ExtensibleDB from 'extensible-mongoose'
import { Project, ProjectDefinition } from "../dbextensions/ProjectDBExtension";
import { createRecord, deleteRecord, findRecordById, findRecords } from "../lib/mongo-helper";
import ProductController from "./ProductController";
import { ProductDefinition } from "../dbextensions/ProductDBExtension";
import { escapeString, mongoIdToString, unescapeString } from "../lib/parse-helper";
import { EndpointDefinition } from "../dbextensions/EndpointDBExtension";
import EndpointController from "./EndpointController";
export default class ProjectController extends APIController {
 
    getControllerName() : string {
        return 'project'
    }

    getProjects: ControllerMethod = async (req: any ) => {
 

        /*  if(!req.fields || !req.fields.publicAddress){
            return   {success:false, error: 'Missing publicAddress' } 
        }
            
        */

        //can find by adminAddress 
        const adminAddress = web3utils.toChecksumAddress(req.fields.adminAddress)

        let projectsArrayResponse = await findRecords({ adminAddress  }, ProjectDefinition , this.mongoDB ) 


        let projectsArray = projectsArrayResponse.data 

        console.log('shopsArray',projectsArray)

        let outputArray = await Promise.all(projectsArray.map(item => ProjectController.getProjectRenderData(item, this.mongoDB)))
 

        return   {success:true, data:  outputArray } 
       
    }

    getProject: ControllerMethod = async (req: any ) => {

        console.log('getProject',req.fields)


        if(!req.fields || !req.fields.shopId){
            return   {success:false, error: 'Missing projectId' } 
        }

 
        let projectId = APIHelper.sanitizeInput(req.fields.projectId,'string') 
        
 
        let projectResponse = await findRecordById( projectId , ProjectDefinition, this.mongoDB)
 

        if(!projectResponse.success){
            return  projectResponse
        }


        let project = projectResponse.data
 
      
        let projectData = await ProjectController.getProjectRenderData(project,this.mongoDB) 

        console.log('projectData', projectData)

        return   {success:true, data: projectData}

    }


    //will require [degen] auth token to prove pub address (pre hook)
    createProject: ControllerMethod = async (req:any )=> {
 

        if(!req.fields.name){
            return {success:false, error: 'Missing name' }  
        }

        if(!req.fields.publicAddress){
            return {success:false, error: 'Missing publicAddress' }  
        }

       
        let projectName = APIHelper.sanitizeInput( req.fields.name.toLowerCase(), 'string' ) 
        let publicAddress = APIHelper.sanitizeInput(req.fields.publicAddress, 'publicaddress')
         
        let attachedImageIds = APIHelper.sanitizeInput(req.fields.attachImages, 'json_string[]')
         

        let insertProjectResponse = await ProjectController.insertNewProject( projectName , publicAddress, this.mongoDB)
 
  

        if(!insertProjectResponse.success){
            console.log('could not insert')
            return   insertProjectResponse
        }

 
       // let insertedProjectId = mongoIdToString( insertProjectResponse.data._id ) 
 

       
           

        return insertProjectResponse 
       

    }


    editProject: ControllerMethod = async (req:any ) => {

        console.log('edit shop', req.fields )

        return {success:true}
    } 



    static async insertNewProject(name:string, adminAddress:string, mongoDB: ExtensibleDB):
     Promise<AssertionResponse>{
         
      
        let projectData:Project  = {
            name:  escapeString(name.toLowerCase()),
            urlSlug: APIHelper.buildSlug(name),
           
            adminAddress 
        }
 

       return await createRecord( projectData, ProjectDefinition, mongoDB  )

 

    }
 

  
    static async getProjectRenderData(project:any,  mongoDB: ExtensibleDB ){

        let projectId = mongoIdToString( project._id ) 

        return {
            name: unescapeString(project.name),
            projectId, 
            adminAddress: project.adminAddress,
            products: await ProjectController.getChildEndpointsData(projectId, mongoDB)  
        }
    }
  


    static async getChildEndpointsData(parentProjectId:string, mongoDB: ExtensibleDB ){
     
        let itemsListResponse = await findRecords({parentProjectId},EndpointDefinition,mongoDB)

        let itemsList = itemsListResponse.data 

        return await Promise.all(itemsList.map(  x => {return EndpointController.getEndpointRenderData(x,mongoDB)}))
 
    }



    static async getOwnerOfProject(projectId: string, mongoDB: ExtensibleDB): Promise<AssertionResponse> {
        
        let recordResult = await findRecordById(projectId, ProjectDefinition, mongoDB)

        if(!recordResult.success){
            return recordResult            
        }

        let project = recordResult.data 

        return {success: true, data: project.adminAddress}
        
         
    }
     





}