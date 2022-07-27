



<template> 
<tbody v-cloak>

            <tr v-for="row of threadsArray" :key="row.threadId"
             class="  w-full py-4 hover:bg-neutral-200 cursor-pointer  text-center " 
             @click="onClickedThreadBanner(row)">
               
              <td class="py-2 px-2 my-2  " style="width:65%" >
                  
                
                 <ThreadBanner
                  class="w-full text-left"
                  :threadData="row"
                  
                  > 
                  </ThreadBanner>
                  
             </td>

             <td>2</td>
              <td>3</td>
               <td>4</td>
              
            </tr>


</tbody> 



</template> 
<script>

import AppHelper, {routeTo} from '@/js/app-helper'
 

 import ThreadBanner from "@/views/components/thread/ThreadBanner.vue"


export default {
  name: 'ThreadBannerList',
  props: [  'threadsArray'  ],
  components: {  ThreadBanner},
  data() {
    return {
      
    }
  },
  watch: {
    
  },


  created(){
     
       
  },
  mounted(){

        
      
  },
  methods: {
    routeTo,

    onClickedThreadBanner(threadData){
      this.$emit('onClickThreadBanner',threadData)

    }
 
     

  }
}
</script>
