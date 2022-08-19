import { AssertionResponse, ControllerMethod } from "degen-route-loader"
 
//import {routes as degenAuthRoutes } from '../../server/controllers/DegenAuthController' 
 
//import axios from "axios";
const axios = require('axios')

//import AppHelper from './app-helper.js'
 
const allRoutes = require('../../shared/routes/all_routes.json')

//let degenAuthRoutes = DegenAuthController.routes 

//allRoutes = allRoutes.concat(degenAuthRoutes)




 const clientConfig = require('../../shared/config/clientConfig.json')

 const envmode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

//export default class RestAPIHelper {

  export function  getBaseURI(){

    const externalRoutes = clientConfig[envmode].externalRoutes

    //from config file 

    return externalRoutes.api //'http://localhost:3000'
  }


  export function  resolveURIFromRouteName(routeName:string){
 

    for(const route of (allRoutes)){

      if(route.method.toLowerCase() == routeName.toLowerCase()){
        
        const matchingRouteURI = route.uri
        return getBaseURI().concat(matchingRouteURI)
      }
    }

    return undefined 

  }

//}


export async function resolveRoutedApiQuery(routeName:string, inputData:any){

  const uri = resolveURIFromRouteName( routeName )
  
  console.log('resolved uri', uri , inputData )

  const response = await resolveRestQueryAsserted(uri,inputData)
  
  return response 
}



 

//prefer to use this method 
export async function resolveRestQueryAsserted(uri:string, inputData:any) /* : Promise<AssertionResponse>*/ {

  const options = { } //withCredentials: true

            const result = await axios.post(uri, inputData,options )
            .then((res:any) => {

                const results = res.data 

                return results
            })
            .catch((error:any) => {

                console.error('err',error)
                return {success:false, data: null, error: 'POST request error'}
            }) 
    
            return result 
 
}
 