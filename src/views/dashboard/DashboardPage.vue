<template>
 <DashboardLayout > 

    <div  class="pb-16"> 

     <div  v-if="mainTitle" class=" font-sharp text-2xl mb-8 text-neutral-600 "> {{ mainTitle }} </div>

    
    <slot v-if="isSignedIn()" > </slot>  



      <InfoPane 
      class="mt-16"
      v-if="!isSignedIn()">

          Please sign in to access this page.

      </InfoPane> 
  
    </div>

   </DashboardLayout>
</template>


<script>
 

import AppHelper, {routeTo,getWeb3StorageData } from '@/js/app-helper'
 

 
import DashboardLayout from './DashboardLayout.vue';
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import FrontendHelper from '@/js/frontend-helper';
 
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'

 
 
import {isSignedIn} from '@/js/frontend-helper'


export default {
  name: "DashboardPage",
  props: ['mainTitle'],
  components: {DashboardLayout, InfoPane },

  


  data() {
    return {
         
    };
  }, 
  mounted() {
    
  },

  methods: {
   
    routeTo,
    isSignedIn
 
    

    
  },
};
</script>
