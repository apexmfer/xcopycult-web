 

<template>
    
     <div
         @click="openCartPreview"
         class="select-none hover:bg-neutral-200 bg-neutral-300 px-4 py-2 cursor-pointer"
         > 
            <SvgIcon type="cart" />  {{cartItemsCount}}
            
         </div> 

</template>




<script>

import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import SvgIcon from '../SvgIcon.vue'
 

export default {

  name: 'ButtonCart',
  props: [  ],
  components: {SvgIcon},
  data() {
    return {
       
    }
  },
   
  computed: {
        cartItemsCount () { 
            return this.$store.getters.getCartItems.size
        }
    },

  created() {
 

  },
  methods: {

     routeTo,

      web3IsActive(){          
         return this.$store.state.web3Storage.active
       },
       activeAccount(){          
         return this.$store.state.web3Storage.account
       },

       openCartPreview(){
         this.$store.commit('setShowCartPreview',true)
       }
 

      /* cartItemsCount(){
           return this.cartItems.length
       },

       refreshCartItems(){
            console.log('refreshCartItems')
            let cartItemsMap = this.$store.state.shoppingCart.cartItems
            this.cartItems = Array.from(cartItemsMap.values())
            this.$forceUpdate();

       }*/


  }
}
</script>