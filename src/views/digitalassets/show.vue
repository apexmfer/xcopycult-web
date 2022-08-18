<template>
   
   <ForumLayout> 
 
    <div v-if="threadData">

      <div class="flex flex-row">
        <div class="flex-grow">
         <div class=" font-sharp text-2xl "> {{threadData.title}} </div>
        </div>

          <div class=" ">
         <div class=" font-sharp text-md "> {{threadData.createdAt}} </div>
        </div>
      </div>

    <hr class="" /> 


    <div v-for="post of posts"> {{post.body}} </div>



    </div>
  
  

 

   </ForumLayout>


</template>


<script>

// {modelname: 'thumbnailImages', label:'Brand Image', type: 'images', quantity: 3},

import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import ForumLayout from '../forum/ForumLayout.vue';
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
      ForumLayout,
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
            threadData: undefined, 
            posts:[]
        };
    },
    

  created() {


    
 
  },
  async mounted () {

      this.activeAccount = isSignedIn()

      this.loadThreadData()
      this.loadPosts()
      //this.activeAccount = this.$store.state.web3Storage.account 
  },
  methods: {
     
    routeTo,isSignedIn,

 
    async loadThreadData(){


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
