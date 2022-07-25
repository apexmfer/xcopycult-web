<template>
  <nav role="navigation" class="  m-2 p-2  ">


    


</nav>
</template>


<script> 
//import Config from '../../config/UpperNav.ts'
import NavConfig from '@/views/config/nav-config.json'

import Blockie from '../../elements/Blockie.vue'
 

export default {
  name: 'UpperNav',
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