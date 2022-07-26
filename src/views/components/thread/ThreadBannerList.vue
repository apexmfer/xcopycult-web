



<template> 
<tbody v-cloak>

            <tr v-for="row of threadsArray" class="hover:bg-gray-700 cursor-pointer  py-4 rainbow-hover " @click="clickedRow(row)">
               
              <td class="py-2 px-2 my-2 truncate" >
                  
                 <ThreadBanner>
                     
                     
                     
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

       
      this.loadThreads()
      
  },
  methods: {
    routeTo,

    async loadThreads(){

      let page = 0;

      let response = await resolveRoutedApiQuery('getThreads', {page})

        this.threadArray = []
      

    },
     

  }
}
</script>
