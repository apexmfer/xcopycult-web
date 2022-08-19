    
 
 
const degenAuthStorage = {
    state: {
        
        challenge: undefined,
        authToken: undefined
        
    },
    getters: {
        getChallenge (state:any) {
          
            return state.challenge

        },
      
        getAuthToken(state:any){
            return state.authToken
        }
    },
    mutations: {

         
        setChallenge(state:any, challenge:any) {
           
            state.challenge = challenge
        },

        setAuthToken(state:any, authToken:any){
           
            state.authToken = authToken
        },
       
      

    },
    actions: {

        


     
    }
}

export default degenAuthStorage;