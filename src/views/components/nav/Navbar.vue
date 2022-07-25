<template>
<div>



  
  <div  class="navbar w-nav bg-transparent p-4 px-8">

    <div class="flex flex-row"> 

      <div class="flex-grow "> 
        

          
              <div class=" hover:bg-neutral-200 px-4 py-2 inline-block cursor-pointer" @click="routeTo($router,{name:'home'})"> 
                <img src="@/assets/images/ufoicon.png" style="max-width:40px;" /> 
             </div>   
             
         
            <button @click="showResponsiveMenu=!showResponsiveMenu" class=" block lg:hidden px-3 py-2 border rounded text-black border-teal-400 hover:text-black hover:border-neutral-400">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>



     </div>


     <div class="flex flex-row" v-if="!isSignedIn()" > 
 
        <ButtonDefault 
        customClass="border-2 px-4 mx-4 border-neutral-300 text-neutral-800 hover:text-neutral-600"
        @clicked="routeTo($router,{name:'login'})">
          Sign Up
        </ButtonDefault>
         

         
        <ButtonDefault 
        customClass="px-4 mx-4 text-neutral-800  hover:text-neutral-600"
        @clicked="routeTo($router,{name:'login'})"
        >
          Sign In
        </ButtonDefault>
         
 
        
       
     
      </div>


       <div  class="flex flex-row" v-if="isSignedIn()">

        <ButtonDefault 
        customClass="border-2 px-4 mx-4 border-neutral-300 text-neutral-800 hover:text-neutral-600"
        @clicked="routeTo($router,{name:'dashboard'})">
         Dashboard
        </ButtonDefault>
        
        
        <ButtonDefault 
        customClass="px-4 mx-4 text-neutral-800  hover:text-neutral-600"
        @clicked="redirectTo('@api/usersession/logout')"
        >
          Sign Out
        </ButtonDefault>
         
 
          </div>


    </div>
  
  </div>


 
           <div class="flex-grow">

          
            <div v-if="showResponsiveMenu" class="w-full absolute left-0 block flex-grow lg:flex lg:items-center lg:w-auto bg-gray-200">
              <div class="text-sm lg:flex-grow">
                <NavbuttonsVertical 
                
                />

              </div>

           </div>
           </div>
 
        

  </div>
</template>


<script>

import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
 
 
import {isSignedIn} from '@/js/frontend-helper'

import NavbuttonsHorizontal from './Navbuttons_horizontal.vue';
import NavbuttonsVertical from './Navbuttons_vertical.vue';

import AccountNavButtons from './AccountNavButtons.vue'

import SvgIcon from '@/views/elements/SvgIcon.vue'

import ButtonDefault from '@/views/elements/button_default.vue'
 
export default {
  name: 'Navbar',
  props: [  ],
  components: {
    NavbuttonsVertical,
    NavbuttonsHorizontal,
   
    SvgIcon,
    AccountNavButtons, 
    ButtonDefault
  },
  data() {
    return {
      showResponsiveMenu: false,
      showWeb3ConnectModal: false
    }
  },
  methods: {

     routeTo,redirectTo,
     isSignedIn,
  /*
      web3IsActive(){          
         return this.$store.state.web3Storage.active
       },
       activeAccount(){          
         return this.$store.state.web3Storage.account
       } 
  */

  }
}


</script>