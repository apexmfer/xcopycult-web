 

<template>
    
    <div class="flex flex-row flex-grow" :class="customClass"> 


          <div class="p-4 border-black border-2">
              <img :src="getPrimaryImageURL()" class="bg-neutral-200" />

          </div>
         
          <div class="px-8 flex-grow"> 
            <div class="text-lg">   {{cartItemData.name}}  </div>
 
              <div class="flex flex-row">
             <div class="text-sm">  Qty: {{cartItemData.quantity}}  </div>
             <div class="text-right text-sm flex-grow">  ${{cartItemData.priceUsd}}  </div>
            </div>

           </div>
          
  </div> 


</template>




<script>
 
import {getFallbackImageURL} from "@/js/frontend-helper"

export default {
  name: "CartItemRow",
  props: [ 'cartItemData', 'customClass' ],
  components: {   },
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
       
    getPrimaryImageURL(){



      return getFallbackImageURL()
    }
 
    
  },
};
</script>
