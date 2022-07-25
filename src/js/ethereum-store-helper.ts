
 
import axios from "axios";

import AppHelper from './app-helper.js'
 

export default class EthereumStoreHelper {

 

}


export function connectedToWeb3( store:any  ){

    console.log('store',store)

    if(!store || !store.web3Storage) return false 

   
  const activeAccount = store.web3Storage.account
   
    console.log('activeAccount',activeAccount)

  return !!activeAccount
}


 