<template>
   
   <DashboardLayout> 
 
 

     <div   class=" font-sharp font-bold text-2xl mb-8 ">  RQR Dashboard   </div>






    <InfoPane
     class="my-16"
     >

     <CHeading > Create </CHeading>
         


        <div class="flex flex-row">


      <div class="w-1/2 p-8 text-center"> Define a new QR Code that dynamically routes to your media.   </div> 

      <div class=" w-1/2 p-8 py-4 text-center">
         <ButtonDefault
          class="mt-4 bg-blue-500 hover:bg-blue-600 inline-block rounded"
           @clicked="routeTo($router,{name:'dashboardendpointnew'})"> 
            Design your QR Code
         </ButtonDefault>
      </div>


          </div>
        




    </InfoPane> 



   </DashboardLayout>


</template>


<script>


 
import DashboardLayout from './DashboardLayout.vue';


import AppHelper, {routeTo} from '@/js/app-helper'

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'

import {
 
  CButton, 
  CHeading
} from '@chakra-ui/vue';
 
 
export default {
  name: "Overview",
  props: [],
  components: { DashboardLayout, InfoPane, ButtonDefault, CHeading},
  data() {
    return {
      
    };
  },

  created() {
    
 
  },
  mounted: function () {
     
  },
  methods: {
      routeTo
  },
};
</script>
