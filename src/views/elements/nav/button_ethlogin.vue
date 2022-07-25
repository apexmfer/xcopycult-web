 

<template>
    
    <div  > 
         
           <div v-if="!web3IsActive()" 
           class=" hover:bg-neutral-200 px-4 py-2 cursor-pointer"
          
          @click="showWeb3Modal()"> 
           <img src="@/assets/images/ETH_1027.svg" class="inline-block" width="32px"/>  
          
          Login 
          </div>

          <div v-if="web3IsActive()" 
          class=" hover:bg-neutral-200 px-4 py-2 cursor-pointer"
             
            @click="showSidenav() "> 
            <img src="@/assets/images/ETH_1027.svg" class="inline-block" width="32px"/>  
          
            <Blockie class="inline-block" v-bind:publicAddress="activeAccount()" v-bind:width="32" />
          </div>
         
          
 </div> 


</template>




<script>
 
 
import Blockie from '../Blockie.vue'


export default {
  name: "EthLoginButton",
  props: [ ],
  components: { Blockie },
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
        onClicked(){
            this.$emit('clicked');
        },

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
 
    
  },
};
</script>
