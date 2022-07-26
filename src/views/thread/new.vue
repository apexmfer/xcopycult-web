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
                {modelname: 'categoryId', label:'Category', type: 'select'}, 
                {modelname: 'body', label:'Post Body', type: 'markdown'}, 
                {modelname: 'thumbnailImages', label:'Brand Image', type: 'images', quantity: 3},
            ],
            submitRoute: 'createThread'
 
            
            }"

          @onPostSuccess="routeTo($router,{name:'dashboardshopindex'})"
          @onPostFailed="renderError"
          @onError="renderError"
    />

     <ErrorBanner
      ref="errorBanner"
     />

     <ButtonDefault @clicked="$refs.autoform.submit()"> Submit </ButtonDefault>
      
   </div>


    <InfoPane 
    class="mt-16"
    v-if="!activeAccount ">

        Please sign in first.

    </InfoPane> 
   

   </ForumLayout>


</template>


<script>

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
    name: "ShopNew",
    props: [],
    components: {
      ForumLayout,
      ErrorBanner,
      GenericTable,
      InfoPane,
      ButtonDefault,
      AutoForm},
        
 
  watch: {
    '$store.state.web3Storage.account' (newAccount) {
      this.activeAccount = newAccount
    }
  },

    data() {
        return {
            activeAccount: undefined,
            
        };
    },
    

  created() {


    
 
  },
  async mounted () {

      this.activeAccount = isSignedIn()
      //this.activeAccount = this.$store.state.web3Storage.account 
  },
  methods: {
     
    routeTo,isSignedIn,

 

    renderError(msg){
      this.$refs.errorBanner.renderError(msg)
    },

  },
};
</script>
