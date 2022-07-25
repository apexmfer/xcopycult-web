    
 

const MAX_CART_SIZE = 20;

import {isValidNumber} from '../util/vuex-util'

 

const shoppingCart = {
    state: {
        
        cartItems: new Map()
        
    },
    getters: {
        getCartItems (state:any) {
          
            return state.cartItems

        },
      
        getMaxCartSize (state:any){
            return MAX_CART_SIZE
        }
    },
    mutations: {

        //every item id WILL be unique 

        addPurchaseableToCart(state:any, {purchaseableId, quantity}: {purchaseableId:string, quantity:number}) {
 

            if(  isNaN(quantity) || quantity < 1){
                throw(new Error('To add to cart, cart quantity must be positive numbers'))
            }
            

            if(state.cartItems.size >= MAX_CART_SIZE){
                throw(new Error('Cannot exceed maximum cart size'))
            }


            let newQuantity = quantity
            const existingItem = state.cartItems.get(purchaseableId)

            if(existingItem && isValidNumber( existingItem.quantity )){
                newQuantity += parseInt(existingItem.quantity)
            }

            state.cartItems.set(purchaseableId,{ purchaseableId, quantity: newQuantity })

            console.log('added purchaseable to cart')

            
                     
        },
        removeItemFromCart(state:any, {purchaseableId, quantity}: {purchaseableId:string, quantity:number}) {
 

            if(  isNaN(quantity) || quantity < 1){
                throw(new Error('To remove from cart, quantity must be positive numbers'))
            }

            const existingItem = state.cartItems.get(purchaseableId)

            if(existingItem){

                if(!isValidNumber( existingItem.quantity )){
                    state.cartItems.delete(purchaseableId)
                    return 
                }

                const newQuantity = parseInt(existingItem.quantity) - quantity;

                if(newQuantity <= 0){
                    state.cartItems.delete(purchaseableId)
                    return 
                }

                state.cartItems.set(purchaseableId,{ quantity: newQuantity })

                 
            }
 
        },


        clearCart(state:any) {
            state.cartItems.clear()
        },

        saveCart(state:any) { 

            //reactive state
            state.cartItems = new Map(state.cartItems);


            localStorage.setItem(
                'cartItems',
                JSON.stringify(Array.from(state.cartItems.entries()))
            ) 
           
        },


        initCart(state:any) {   

            try{

            const cartItems = localStorage.getItem('cartItems')
            
            if (cartItems) {               
                state['cartItems'] =  new Map(JSON.parse(cartItems)) //;   localStorage.getItem(varName);
                console.log(`loading cartItems`)
             }


            }catch(e){
                console.error(e)
            }
            
             /*
            for(let varName of paramsToPersist){
                if (localStorage.getItem(varName)) {
               
                    state[varName] = localStorage.getItem(varName);
                    console.log(`loading ${varName} `, state[varName])
                 }
            }*/
            

          }
       
      

    },
    actions: {

        async addCartItem({state, commit, dispatch}:{state:any, commit:any, dispatch:any},{purchaseableId, quantity}:{purchaseableId:string, quantity:number}) {

            commit('addPurchaseableToCart', {purchaseableId, quantity})
            commit('saveCart')
        },

        async removeItem({state, commit, dispatch}:{state:any, commit:any, dispatch:any},{purchaseableId, quantity}:{purchaseableId:string, quantity:number}) {
            commit('removePurchaseableFromCart', {purchaseableId, quantity})
            commit('saveCart')
        },

        async clearCart({state, commit, dispatch}:{state:any, commit:any, dispatch:any}) {
            commit('clearCart')
            commit('saveCart')
        }



     
    }
}

export default shoppingCart;