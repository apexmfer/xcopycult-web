<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col"> 

   

      <div class=" py-24 ">
        Gallery !
      </div>

      <div class="flex flex-row  py-12 w-full ">
        <div class="flex-grow"></div>
        <div class="">  
          <ButtonDefault 
           :customClass="' w-full mt-8 bg-purple-500 border-2 border-neutral-600 hover:bg-purple-400 text-gray-200'"  
           @clicked="routeTo($router,{name:'digitalassetsnew'})" 
           > Add XCOPY Digital Assets </ButtonDefault>

         
        </div>
      </div>


     </div>


  


   </PrimaryLayout>
  </div>
</template>


<script>
 

import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
 
 
import PrimaryLayout from './PrimaryLayout.vue';
 
import ButtonDefault from '@/views/elements/button_default.vue'
 
export default {
  name: "Home",
  props: [],
  components: { PrimaryLayout, ButtonDefault},
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
    routeTo,

    getRouteTo(dest) {
      return FrontendHelper.getRouteTo(dest);
    },

    
  },
};
</script>
