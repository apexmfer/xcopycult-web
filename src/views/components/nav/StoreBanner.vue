<template>
 



  <div  class="navbar w-nav">
    <div class=" bg-transparent">
    <div class=" ">
      <div class="  ">
 

      <div class="hidden lg:inline-block w-full">
 
 
       <div class=" w-full flex flex-row  text-black  " >

         <!-- upper left buttons  --> 
         <div class="mt-6 mx-2 flex-grow "> 
              <div class=" inline-block mx-2 ">
              <img class="inline-block mb-1 " width="24" height="24" src="@/assets/images/toadz1.png" />
              </div>
              <router-link to="/" class='no-underline flex-grow inline text-xl text-gray-900 font-sharp'>Toadz Shop</router-link>
        </div>

        <div class="flex-grow" > 
            <img src="@/assets/images/toadz_outline.png" class="pixelated" width="128px"/>
          
            </div>
          
        
       </div>

       </div>



       <div class="block lg:hidden   p-4  w-full"  >


         <div class="flex flex-row"> 


           <div class="flex-grow">

               <div>    
                  <img src="@/assets/images/toadz_outline.png" class="pixelated" width="128px"/>
              </div>

            </div>

        </div>

       </div>

 


      </div>

    </div>
    </div>
    </div>
 
     
         
</template>


<script>

import AppHelper, {routeTo} from '@/js/app-helper'
 

 

import AccountNavButtons from './AccountNavButtons.vue'

import SvgIcon from '../../elements/SvgIcon.vue'


import CartButton from '../../elements/nav/button_cart.vue'

import EthLoginButton from '../../elements/nav/button_ethlogin.vue'

export default {
  name: 'StoreBanner',
  props: [  ],
  components: { 
    SvgIcon, 
   
    AccountNavButtons, 
    CartButton,
    EthLoginButton
  },
  data() {
    return {
      showResponsiveMenu: false 
    }
  },
  methods: {

     routeTo,

      web3IsActive(){          
         return this.$store.state.web3Storage.active
       },
       activeAccount(){          
         return this.$store.state.web3Storage.account
       } 
  

  }
}


</script>