<template>

<div>

   <div class="section bg-gray-200  border-b-2 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug"
        v-bind:accessPlug="accessPlug"
       />
     </div>


   </div>

  

   <div class="section  bg-white border-b-2 border-black">
     <div class="autospacing w-container">
        
       <div class="w-column">
          <div class="text-lg font-bold"> Your Bids  </div>
          
          <div  class=" " v-if="!connectedToWeb3">
              <NotConnectedToWeb3 />
          </div>

          <div  class=" " v-if=" connectedToWeb3">

             
            

            <div v-if="selectedTab=='bids'" class="mb-4 ">

           

           </div>


          </div>


          
       </div>
     </div>
   </div>


    


    
  <Footer/>

</div>
</template>


<script>



import NotConnectedToWeb3 from './components/NotConnectedToWeb3.vue'

 

import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import GenericTable from './components/GenericTable.vue';
 

import FrontendHelper from '../js/frontend-helper'

export default {
  name: 'Application',
  props: [],
  components: {Navbar, Footer, TabsBar, GenericTable, NotConnectedToWeb3},
  data() {
    return {
     
      activePanelId: null,
      selectedTab:"bids",
      bidRowsArray:[],
 
      currentBlockNumber: 0
    }
  },

  created(){

 
   
 

  },
  mounted: function () {
    
      
   
  }, 
  methods: {
          
  }
}
</script>
