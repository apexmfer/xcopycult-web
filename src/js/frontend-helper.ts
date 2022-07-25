

  
 
import web3utils from "web3-utils";

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
 
const clientConfig = require('../../shared/config/clientConfig.json')[env]

const localeData = require('../../shared/config/localeData.json')

const fallbackImage = require('@/assets/images/toadz_outline.png')


export default class FrontendHelper {

    
}


export function getCookies(): any {
    return document.cookie; 
}

export function getSessionToken()  {
    
    return fetchCookie(getCookies(),'sessionToken')
}

export function isSignedIn() : boolean{

    console.log('is signed in ', (typeof getSessionToken() != 'undefined'))
    return (getSessionToken() != 'undefined' && typeof getSessionToken() != 'undefined')
}

export function fetchCookie(cookieString:string, tag:string){
    return cookieString.split('; ')
    .find(row => row.startsWith(`${tag}=`))
    ?.split('=')[1];
}


export function getConfiguredRouteTo(dest:string){
    return clientConfig.externalRoutes[dest]
}


export function getImageURL( fileName:string ){
    const imageRoot = clientConfig['externalRoutes']['imageRoot']
    return imageRoot.concat(fileName)
}

export function getFallbackImageURL(  ){
    //const fileName = ""
    //let imageRoot = clientConfig['externalRoutes']['imageRoot']
    //return imageRoot.concat(fileName)
    return fallbackImage
}


export function toChecksumAddress( address:string ){

    if(!address) return address 

    return web3utils.toChecksumAddress( address )
}




export function getRouteTo(dest:string){
 
    return clientConfig.external_routes[dest]  

}


export function getStateCodesData() {

    return localeData.stateCodes 
}



export function getCountryCodesData() {

    return localeData.countryCodes 
}


export function limitEntropy( input: any , entropyCount:number ){
 
    if(input.toString().indexOf('.') == -1) return input 

    const inputAfterDecimal = input.toString().split('.')[1]

    const trimmedInputAfterDecimal = parseInt(inputAfterDecimal)
    const initialEntropy = trimmedInputAfterDecimal.toString().length

 
    if( initialEntropy <= entropyCount ) return input 

    const excessEntropy = initialEntropy - entropyCount
  

    return input.toString().substring(0, input.toString().length - excessEntropy)
}

export function loadFromLocalStorage( key:string ){

   const item = localStorage.getItem(key)

   if(item && typeof item =='string'){
    return JSON.parse(item)
   }

   return undefined
   
}

export function saveToLocalStorage(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));
}
