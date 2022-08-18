<template>
  <div   class="  flex flex-row py-4 ">


      <div 
      class="  px-2 text-gray-700 hover:text-black cursor-pointer"
       @click="routeTo($router,item.path)" 
      v-for="item in navConfig.buttons" :key="item.title"
      >  {{item.title}}   </div>
      

    
     <div 
     v-if="!activeAccount()"
     class="ml-4  px-2 text-gray-700 hover:text-black cursor-pointer border-l-2 border-gray-100"
      @click="showWeb3Modal()" >  Sign In   </div>


    <img 
     v-if="activeAccount()"
     class="ml-4  px-2 text-gray-700 hover:text-black cursor-pointer border-l-2 border-gray-100"
      @click="showSidenav()"
      src="@/assets/images/eth-logo-solid.png"
      height="32px"
      width="32px"
      
       />  

     



</div>
</template>


<script> 
 
import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
 
import NavConfig from '@/views/config/nav-config.json'



import Blockie from '../../elements/Blockie.vue'
 

export default {
  name: 'NavButtonsHorizontal',
  props: [  ],
  components:{  Blockie  },
  watch: {
    '$store.state.web3Storage.active':function(){
        console.log('web3 active ',this.web3IsActive() )
    } 

  },
  data() {
    return {
      
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
       
       showWeb3Modal(){
         this.$store.commit('setShowWeb3ConnectModal',true)
       },
       showSidenav(){
         this.$store.commit('setShowSidenav',true)
       } 

  }
}
</script>