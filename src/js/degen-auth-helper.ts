/* eslint-disable */ 
import { AssertionResponse } from "degen-route-loader";
import {resolveURIFromRouteName, resolveRestQueryAsserted} from '@/js/rest-api-helper'
import { resolveRoutedApiQuery } from "./rest-api-helper";


const ethers = require('ethers')



export async function fetchNewChallenge(publicAddress:string): Promise<AssertionResponse> {

let generateChallengeResponse = await resolveRoutedApiQuery( 
    'generateChallenge' ,
     {publicAddress} )

if(!generateChallengeResponse.success) return generateChallengeResponse

return {success:true, data: generateChallengeResponse.data}
  

}

export async function fetchNewAuthToken(publicAddress:string, challenge:string, signature: string): Promise<AssertionResponse> {

    return {success:false}

}




export async function fetchAuthToken(store:any): Promise<AssertionResponse> {

    let authToken = store.state.degenAuthStorage.authToken


    if(!authToken){
        //get it from metamask+server response and commit it for next time 

        let injectedEthereum = store.state.web3Storage.injectedEthereum
        
        console.log({injectedEthereum})

        let publicAddress = store.state.web3Storage.account

        let challengeResponse = await fetchNewChallenge(publicAddress)
        
        if(!challengeResponse.success) return challengeResponse

        console.log({challengeResponse})

        let challenge = challengeResponse.data

        store.commit('setChallenge', challenge)


        let provider = new ethers.providers.Web3Provider(injectedEthereum)


        let signature = await provider.getSigner(publicAddress).signMessage(challenge)

        console.log({signature})


        let authTokenResponse = await fetchNewAuthToken(publicAddress,challenge,signature)

        if(!authTokenResponse.success) return authTokenResponse

        authToken = authTokenResponse.data

        store.commit('setAuthToken', authToken)

        
    }

    if(authToken){
        return {success:true, data: authToken}
    }
    //try to get auth token from vuex store 

    

    return {success:false, error: "Could not load auth token"}; 
}