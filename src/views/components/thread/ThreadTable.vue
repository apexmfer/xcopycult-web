<template> 

<div class=" ">

    <div v-if="title" class="font-sharp text-lg mb-2"> {{title }} </div>

     <table class="table-auto w-full" v-if="dataArray && dataArray.length > 0">
          <thead>
            <tr>
              
              <th> Topic </th>
              <th> Replies </th>
              <th> Views </th>
              <th> Activity </th>
               
            </tr>
          </thead>
          

                 <ThreadBannerList
                :threadsArray="threadsArray"
                > </ThreadBannerList> 
          
              
        </table>

        <PaginationBar
        v-if="dataArray"
        
        > </PaginationBar>

        <div v-if="!dataArray || dataArray.length == 0" v-cloak
        class="my-16">
          No records found.
        </div>
  </div>

 



</template> 


<script>
  
import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import ThreadBannerList from "@/views/components/thread/ThreadBannerList.vue"
import ButtonDefault from "@/views/elements/button_default.vue"
import PaginationBar from "@/views/elements/PaginationBar.vue"

export default {
  name: 'ThreadTable',
  props: [    ],
  components: {  ThreadBannerList, ButtonDefault, PaginationBar},
  data() {
    return {
      threadsArray: []
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

     this.threadsArray = []
      

    },
     

  }
}
</script>
