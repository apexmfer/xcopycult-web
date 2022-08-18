<template>
  <nav role="navigation" class="w-full m-2 p-2 inline-block">

    <div class=" ">
      <EthLoginButton 
        class="border-2 border-neutral-600"
      />


    </div>



    <div class="w-full lg:w-auto block lg:inline-block" v-for="item in navConfig.buttons" :key="item.title">

      <div class="text-lg  px-2 py-4 text-gray-700 hover:text-black cursor-pointer  " 
      @click="routeTo($router,item.path)" >   {{item.title}} </div>

 







  </div>



</nav>
</template>


<script>


import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
 

import AccessButton from '../AccessButton.vue'
//import Config from '../../config/UpperNav.ts'
import NavConfig from '@/views/config/nav-config.json'

import EthLoginButton from '../../elements/nav/button_ethlogin.vue'


export default {
  name: 'AccordionNav',
  props: [  ],
  components:{AccessButton, EthLoginButton},
  data() {
    return {
      activeAccountAddress:null,
      activeNetworkId: null,
      navConfig: null
    }
  },
  created(){
    this.navConfig = NavConfig;
    
  },
  methods: {

      routeTo,

        web3IsActive(){          
         return this.$store.state.web3Storage.active
       },

       activeAccount(){          
         return this.$store.state.web3Storage.account
       },
   
    
    getEtherscanBaseURL(){
        if(this.activeNetworkId == 42){
          return  'https://kovan.etherscan.io'
        }
        return 'https://etherscan.io'
    },
  }
}
</script>