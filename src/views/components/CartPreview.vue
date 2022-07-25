
<template>

    
    <transition name="slide">
    <div v-if="isShown()" class="absolute right-0 top-0 p-6 h-full bg-neutral-800" style="min-width:400px">

          <div 
          class="w-full text-white flex justify-end cursor-pointer mb-16"
          @click="hide()"
          > 
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> 
          </div>

        <div class="w-full font-sharp text-xl p-2 mb-8 bg-neutral-900 text-neutral-200" style="min-width:240px"> 

            Shopping Cart
           
         </div>

 

           <CartItemRow
            v-for="item of cartItemsData" 
            :key="item.itemId" 
            :cartItemData="item" 
            customClass="px-2 py-2 my-2 text-white "
            /> 


            <div v-if="!cartItemsData || cartItemsData.length == 0" class="text-white">
              
              <div> Your cart is empty. </div>


              <ButtonDefault 
               :customClass="' w-full mt-8 bg-purple-500 border-2 border-neutral-600 hover:bg-purple-400'"  
               @clicked="routeTo($router,{name:'home'})"
                > Find what you 🤍 </ButtonDefault>

            </div>


            <div class="p-4  text-neutral-300" v-if="subtotalEth"> 

              Subtotal: Ξ {{limitEntropy(subtotalEth, 6)}}

            </div> 
         
 
           <div v-if="cartItemsData && cartItemsData.length > 0" class="mt-2">
            <ButtonDefault v-if="!web3IsActive()" :customClass="' w-full bg-neutral-500 border-2 border-neutral-600 hover:bg-neutral-400 text-center'"  @clicked="showWeb3Modal"> Login  </ButtonDefault>
            <ButtonDefault v-if="web3IsActive()" customClass=" w-full text-center "  @clicked="checkout"> Checkout  </ButtonDefault>
          </div>

    </div>
  </transition>

</template>

<script>

import AppHelper, {routeTo} from '@/js/app-helper'

import {limitEntropy} from '@/js/frontend-helper'

import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'

import ButtonDefault from '@/views/elements/button_default.vue'
import CartItemRow from '@/views/elements/orders/CartItemRow_micro.vue'

 
export default {
  name: 'CartPreview',
  props: [   ],
  components: { ButtonDefault , CartItemRow},
  data() {
    return {
      cartItems: [],
      cartItemsData: [],
      subtotalEth: 0
    }
  },

   watch: {
    '$store.state.shoppingCart.cartItems'(items) {
      this.fetchCartItemsData( )
    },
    '$store.state.frontEndStorage.showCartPreview'(items) {
      this.fetchCartItemsData( )
    },
     '$store.state.web3Storage.account'(items) {
      this.fetchCartItemsData( )
    }
  },

  mounted(){ 

    this.fetchCartItemsData()
  },
  methods: {
     routeTo,
     limitEntropy,
   
         
      web3IsActive(){          
        return this.$store.state.web3Storage.active
      },
      activeAccount(){          
        return this.$store.state.web3Storage.account
      },

      showWeb3Modal(){
        this.$store.commit('setShowWeb3ConnectModal',true)
      },
  

      hide(){
        this.$store.commit('setShowCartPreview',false)
      },
 

      isShown(){
        return this.$store.state.frontendStorage.showCartPreview          
      },

     
      
       async fetchCartItemsData() {

         console.log('fetching cart items')

        let cartItemsMap = new Map(this.$store.state.shoppingCart.cartItems)

        this.cartItems = Array.from(cartItemsMap.values())

        let purchaseableIds = this.cartItems.map(i => i.purchaseableId)

        let cartItemsDataResponse = await resolveRoutedApiQuery('getPurchaseables', {purchaseableIds} )


        



        if(cartItemsDataResponse.success){

          this.subtotalEth = 0;

          let itemsData = cartItemsDataResponse.data

          
          this.cartItemsData = itemsData.map((i) =>  { 

            let matchingCartItem = cartItemsMap.get(  i.purchaseableId.toString() )

            if(matchingCartItem){ 

              return Object.assign(i, {quantity: matchingCartItem.quantity}) //append quantity 
            }else{

              console.log('no matching cart item ', i , cartItemsMap )
            }


            return i
          })

          this.cartItemsData.map(x => {

            let itemSubTotal = x.priceEth * x.quantity

             if( !isNaN(itemSubTotal) ){
               this.subtotalEth += itemSubTotal
             }
          })
          
          

          console.log('cart items loaded', this.cartItemsData)
        }
      },


      async checkout(){

          let buyerAddress = this.activeAccount()

            let newOrderResponse = await resolveRoutedApiQuery('createOrder', 
            {
              cartItems:this.cartItems,
              buyerAddress
            } 
            )
            console.log('new order data ')

            if(newOrderResponse.success){

              let orderId = newOrderResponse.data.orderId //get this from api call
              console.log('order id is ', orderId)

              if(!orderId){
                console.error('order id is undefined', newOrderResponse)
                return 
              }
              //navigate to the order 
              routeTo(this.$router, {name: 'ordershow'  , params: {orderId} }  )
              this.hide()
              this.$store.dispatch('clearCart')
            }


      }
 
  }
}

</script>
