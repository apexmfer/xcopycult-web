 

 
const paramsToPersist = []

const frontendStorage = {
    state: {
        showWeb3ConnectModal: false,  
        showSidenav: false,
        showCartPreview: false 
    },
    getters: {
       
    },
    mutations: {
      
        setShowWeb3ConnectModal(state:any, show:any) {
            if(show == true){
                console.log('this',this)
                //@ts-ignore
                this.commit('hideAll')
            }
            state.showWeb3ConnectModal = !!show
        },
        setShowSidenav(state:any, show:any) {
            if(show == true){
                 //@ts-ignore
                this.commit('hideAll')
            }
            state.showSidenav = !!show
        },
        setShowCartPreview(state:any, show:any){
            if(show == true){
                 //@ts-ignore
                this.commit('hideAll')
            }
            state.showCartPreview = !!show
        },
        hideAll(state:any){
            state.showWeb3ConnectModal=false
            state.showSidenav=false
            state.showCartPreview=false
        }
        
       
    },
    actions: {

       
    }
}

export default frontendStorage;