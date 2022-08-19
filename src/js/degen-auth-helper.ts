import { AssertionResponse } from "degen-route-loader";



export async function fetchAuthToken(store:any): Promise<AssertionResponse> {

    let authToken = store.state.degenauthstorage.authToken

    if(!authToken){
        //get it from metamask+server response and commit it for next time 



        store.commit('setDegenAuthChallenge', authToken)



        store.commit('setDegenAuthToken', authToken)

        
    }

    if(authToken){
        return {success:true, data: authToken}
    }
    //try to get auth token from vuex store 

    

    return {success:false, error: "Could not load auth token"}; 
}