import { AssertionResponse } from "degen-route-loader";
 
const ethers = require('ethers')

export async function fetchAuthToken(store:any): Promise<AssertionResponse> {

    let authToken = store.state.degenAuthStorage.authToken


    if(!authToken){
        //get it from metamask+server response and commit it for next time 

        let injectedEthereum = store.state.web3Storage.injectedEthereum
        
        console.log({injectedEthereum})

        let publicAddress = store.state.web3Storage.publicAddress

        let challenge = "my first challenge"

        let provider = new ethers.providers.Web3Provider(injectedEthereum)


        let signature = await provider.getSigner(publicAddress).signMessage(challenge)

        console.log({signature})


        store.commit('setDegenAuthChallenge', authToken)



        store.commit('setDegenAuthToken', authToken)

        
    }

    if(authToken){
        return {success:true, data: authToken}
    }
    //try to get auth token from vuex store 

    

    return {success:false, error: "Could not load auth token"}; 
}