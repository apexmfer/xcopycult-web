<template>
   
   <ForumLayout> 
 

    <div class=" font-sharp text-2xl ">  Thread </div>


    <hr class="" /> 

  
  

 

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
