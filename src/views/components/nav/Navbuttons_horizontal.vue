<template>
  <div   class="  flex flex-row py-4 ">


      <div class="  px-2 text-gray-700 hover:text-black cursor-pointer" @click="routeTo($router,{name:'gallery'})" >  Collection   </div>
     <div class="px-2 text-gray-700 hover:text-black cursor-pointer" @click="routeTo($router,{name:'about'})" >  About   </div>
    
     <div class="ml-4  px-2 text-gray-700 hover:text-black cursor-pointer border-l-2 border-gray-100" @click="routeTo($router,{name:'about'})" >  Sign In   </div>



</div>
</template>


<script> 
//import Config from '../../config/UpperNav.ts'
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
       web3IsActive(){          
         return this.$store.state.web3Storage.active
       },
       activeAccount(){          
         return this.$store.state.web3Storage.account
       }
         
  }
}
</script>