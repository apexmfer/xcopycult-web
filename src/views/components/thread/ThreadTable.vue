<template> 

<div class=" my-16">
 
 
     <table style="border-collapse: collapse" class="  w-full" v-if="threadsArray && threadsArray.length > 0">
          <thead >
            <tr class="text-center">
              
              <th class="text-left"> Topic </th>
              <th> Replies </th>
              <th> Views </th>
              <th> Activity </th>
               
            </tr>
          </thead>
          

                 <ThreadBannerList
                :threadsArray="threadsArray"
                @onClickThreadBanner="onClickThreadBanner"
                > </ThreadBannerList> 
          
              
        </table>

        <PaginationBar
        class="mt-16"
        v-if="threadsArray && threadsArray.length > 0"
        
        > </PaginationBar>

        <div v-if="!threadsArray || threadsArray.length == 0" v-cloak
        class="my-16">
          No records found.
        </div>
  </div>

 



</template> 


<script>
  
import AppHelper, {routeTo} from '@/js/app-helper'
 

import RestAPIHelper, {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
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

      console.log({response})

      let threadsResponseArray = []

      if(response.success){
        threadsResponseArray = response.data 
      }

      this.threadsArray = []
      threadsResponseArray.map(x =>   this.threadsArray.push( x ))
       


      

    },

    onClickThreadBanner(threadData){
      routeTo(this.$router,{name:'threadshow',params:{threadId:threadData.threadId}})
    }
     

  }
}
</script>
