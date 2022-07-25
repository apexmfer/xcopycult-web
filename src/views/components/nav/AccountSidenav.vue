<template>
    
    <transition name="slide">
    <div v-if="isShown()" class="absolute right-0 top-0 p-6 h-full bg-neutral-800 flex flex-col">

          <div 
          class="w-full text-white flex justify-end cursor-pointer mb-16"
          @click="hide()"
          > 
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> 
          </div>
 

        <div class="flex-grow">

        <div class="w-full text-white" style="min-width:240px"> 

             <Blockie 
             class="inline-block mr-4"
             v-bind:publicAddress="activeAccount()" 
             v-bind:width="32" />

            <div 
            class=" inline-block truncate text-ellipsis text-xl"
             style="max-width:200px">  {{  activeAccount() }} </div>
           
           
         </div>


          <AccountNavButtons
            @hide="hide"
          /> 

          <slot> </slot> 

          </div>

         <div 
          class="w-full text-white my-8 p-2 bg-neutral-600 hover:bg-neutral-700 cursor-pointer "
          @click="disconnectWeb3()"
          > 
          Disconnect
          </div>

 

    </div>
  </transition>

</template>

<script>

import Blockie from '../../elements/Blockie.vue'
 

import AccountNavButtons from './AccountNavButtons.vue'

export default {
  name: 'SideNav',
  props: [  ],
  components:{  Blockie , AccountNavButtons },
   data() {
    return {
        
    }
  },

  methods: {
       
      web3IsActive(){          
        return this.$store.state.web3Storage.active
      },
      activeAccount(){          
        return this.$store.state.web3Storage.account
      },

      isShown(){
         return this.$store.state.frontendStorage.showSidenav

      },
      hide(){
        this.$store.commit('setShowSidenav',false)
      },


      disconnectWeb3(){
        this.$store.dispatch('disconnect')
        this.hide()
      }

        
      
 
  }

}
</script>