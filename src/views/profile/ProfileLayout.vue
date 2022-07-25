<template>
  <div>
   <PrimaryLayout> 


     <div class="">
     

        <div class="grid grid-cols-4 gap-1 text-white">
  
          <div class="col-span-1  border-2 border-neutral-400 rounded bg-neutral-100 text-black" style="min-height:600px">
          
            <div class="bg-neutral-800 text-white font-sharp text-2xl p-2 mb-2">
            Profile
            </div>

              <ButtonH customClass=""   @clicked="routeTo($router,{name:'profile'})"> Profile Overview </ButtonH>
              <ButtonH customClass=""   @clicked="routeTo($router,{name:'profileorderindex'})"> Orders </ButtonH>

            
 
          
          </div>
          <div class=" col-span-3 bg-neutral-200" style="min-height:600px">
          
            <div class="  p-4   text-neutral-800 ">

                  <slot></slot>
            </div>


          </div>
        </div>


    </div> 



   
   </PrimaryLayout>
  </div>
</template>


<script>
 
/*
  v-if="userIsAdmin( activeAccount() )"
*/
 
import PrimaryLayout from '../PrimaryLayout.vue';
import ButtonH from '../elements/button_h.vue'

import AppHelper, {routeTo, userIsAdmin} from '@/js/app-helper'
 


export default {
  name: "ManagementLayout",
  props: [],
  components: { PrimaryLayout, ButtonH},

  


  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
   
    routeTo 

    
  },
};
</script>
