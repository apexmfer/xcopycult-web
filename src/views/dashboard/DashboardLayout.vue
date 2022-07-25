<template>
  <div>
   <PrimaryLayout> 


     <div class=" ">
     

        <div class="grid grid-cols-4 gap-1 text-white">
  
          <div class="col-span-1  border-2 border-neutral-400 rounded bg-neutral-100 text-black" style="min-height:600px">
          
            <div 
            class="bg-neutral-800 cursor-pointer text-white font-sharp text-2xl p-2 mb-2"
             @click="routeTo($router,{name:'dashboard'})"
            >

            Dashboard
            </div>


            

               <ButtonH 
                customClass="" 
                :highlighted="currentRouteName=='dashboardendpointindex'"
                @clicked="routeTo($router,{name:'dashboardendpointindex'})"> 
                QR Code Endpoints 
              </ButtonH>
           
           
            

          
          </div>
          <div class=" col-span-3 bg-neutral-200" style="min-height:600px">
          
            <div class="  p-4   text-neutral-600 ">

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
  name: "DashboardLayout",
  props: [],
  components: { PrimaryLayout, ButtonH},

  


  data() {
    return {
        
    };
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
    },

  created() {
     
  },

  methods: {
   
    routeTo 

    
  },
};
</script>
