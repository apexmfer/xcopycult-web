<template>
    
     <div>

       
         <div v-for="button of buttonsArray" :key="button.label"
          @click=" $emit('hide') && routeTo($router,button.path) "
          class="w-full text-white mt-8 p-2 bg-neutral-600 hover:bg-neutral-700 cursor-pointer "          
          > 
           {{button.label}}
          </div>


      </div>
 
</template>

<script>
 
import AppHelper, {routeTo,userIsAdmin} from '@/js/app-helper'
 


export default {
  name: 'AccountNavButtons',
  props: [ ],
  components:{    },
   data() {
    return {
        buttonsArray: [
          { label:"My Profile", path:"/profile"  }

        ] 
    }
  },

  mounted(){

    this.initialize()
  },

  methods: {


        /*  

        load user data and if they have a store set up then : 
  ,
          this.buttonsArray.push( { label:"My Dashboard", path:"/dashboard"  } ) 

        */

       initialize(){
         const showSalesDashboardButton = true // for now 

         if(showSalesDashboardButton){
           this.buttonsArray.push( { label:"Sales Dashboard", path:"/dashboard"  } ) 

         }
       },

      
       web3IsActive(){          
         return this.$store.state.web3Storage.active
       },
       activeAccount(){          
         return this.$store.state.web3Storage.account
       },

       userIsAdmin,

       routeTo

      
         
      
 
  }

}
</script>