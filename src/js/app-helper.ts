import { getConfiguredRouteTo } from "./frontend-helper"

 
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'


const adminList =  require('../../shared/config/adminList.json')
const clientConfig = require('../../shared/config/clientConfig.json')[env]
 
export default class AppHelper {
 

   

} 

export function userIsAdmin(publicAddress:string){

    for(const addr of adminList){
        
        if(addr.toLowerCase() == publicAddress.toLowerCase()){
            return true 
        }
    }

    return false        
}



export function routeTo( router:any, name:string, params:any ) {

    

    router.push(name,params)
}


export function redirectTo( path:string  ) {

    path= path.replace('@api',getConfiguredRouteTo('api'))
    console.log(path)
    window.location.href = path
}


export function getWeb3StorageData(store:any){
    return store.state.web3Storage
}