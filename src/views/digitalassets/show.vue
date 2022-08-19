<template>
   
   <PrimaryLayout> 
 
    <div class="section w-container flex flex-col my-16 "> 


      Digital Asset Show 
    </div>
  
  

 

   </PrimaryLayout>


</template>


<script>

// {modelname: 'thumbnailImages', label:'Brand Image', type: 'images', quantity: 3},

import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import PrimaryLayout from '@/views/PrimaryLayout.vue';
import RestAPIHelper, {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import {connectedToWeb3} from '@/js/ethereum-store-helper'

import FrontendHelper from '@/js/frontend-helper';

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'
import ErrorBanner from '@/views/elements/ErrorBanner.vue'

import AutoForm from '@/views/components/form/autoform.vue' 
 


 
import {isSignedIn} from '@/js/frontend-helper'

export default {
    name: "ThreadShow",
    props: [],
    components: {
      PrimaryLayout,
      ErrorBanner,
      GenericTable,
      InfoPane,
      ButtonDefault,
      AutoForm},
        
 
  watch: {
    
  },

    data() {
        return {
            activeAccount: undefined,          
            digitalAssetData: undefined, 
            
        };
    },
    

  created() {


    
 
  },
  async mounted () {

     
      this.loadDigitalAssetData()
    
  },
  methods: {
     
    routeTo, 

 
    async loadDigitalAssetData(){


      const threadId = this.$route.params.threadId

      let response = await resolveRoutedApiQuery('getThread', {threadId})

      this.threadData = response.data
        
       

      console.log('threadData',this.threadData)
    },


    async loadPosts(){


      const parentThreadId = this.$route.params.threadId

      let response = await resolveRoutedApiQuery('getPosts', {parentThreadId})

      this.posts = [] // response.data 

      for(let post of response.data){
        this.posts.push(post)
      }


      console.log('posts',this.posts)
    },


    renderError(msg){
      this.$refs.errorBanner.renderError(msg)
    },

  },
};
</script>
