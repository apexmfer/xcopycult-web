<template>
   
   <ForumLayout> 
 

    <div class=" font-sharp text-2xl "> Create a new Thread </div>


    <hr class="" /> 

 


   <div v-if="activeAccount"> 
    <AutoForm
      
        ref="autoform"

        v-bind:formConfig="{
            
            fields: [
                {modelname: 'title', label:'Thread Title', type: 'text'}, 
                {modelname: 'parentCategoryId', label:'Category', options:categoriesListOptions, type: 'select'}, 
                {modelname: 'body', label:'Post Body', type: 'markdown'}, 
               
            ],
            submitRoute: 'createThread'
 
            
            }"

          @onPostSuccess="routeTo($router,{name:'threadshow',params:{threadId}})"
          @onPostFailed="renderError"
          @onError="renderError"
    />

     <ErrorBanner
      ref="errorBanner"
     />

  <div class="flex flex-row">
    <div class="flex-grow"></div>
     <ButtonDefault
      @clicked="$refs.autoform.submit()"
      class="bg-blue-500 hover:bg-blue-400 inline-block text-white rounded"
      > Submit </ButtonDefault>

    </div>
      
   </div>


    <InfoPane 
    class="mt-16"
    v-if="!activeAccount ">

        Please sign in first.

    </InfoPane> 
   

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
    name: "ThreadNew",
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
            categoriesList: [],
            categoriesListOptions: [] ,
            threadId: undefined //returned from post 
            
        };
    },
    

  created() {


    
 
  },
  async mounted () {

      this.activeAccount = isSignedIn()

      this.loadCategories()
      //this.activeAccount = this.$store.state.web3Storage.account 
  },
  methods: {
     
    routeTo,isSignedIn,

 
    async loadCategories(){

      let response = await resolveRoutedApiQuery('getCategories', {})

      let categoriesArray = response.data
        
      
      this.categoriesList = []
      this.categoriesListOptions = []

      if(categoriesArray){
         categoriesArray.map( x => this.categoriesList.push( 
            {label: x.name, name: x.name, urlSlug: x.urlSlug, categoryId: x.categoryId }  ))

             categoriesArray.map( x => this.categoriesListOptions.push( 
            {label: x.name, value: x.categoryId }  ))
      } 

      console.log('categoriesList',this.categoriesList)
    },


    renderError(msg){
      this.$refs.errorBanner.renderError(msg)
    },

  },
};
</script>
