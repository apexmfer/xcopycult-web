<template>
   
   <DashboardPage
    mainTitle="Create a new QR Code"
   > 
 
  
 
    <AutoForm
      
        ref="autoform"

        v-bind:formConfig="{
            
            fields: [
                {modelname: 'name', label:'Name', type: 'text'},  
                {modelname: 'actionData', label:'Endpoint URL', type: 'text'},  
            ],
            passParams: {actionType:'redirect'}, 
            submitRoute: 'createEndpoint' 
            
            }"

          @onPostSuccess="routeTo($router,{name:'dashboardendpointindex'})"
          @onPostFailed="renderError"
          @onError="renderError"
    />

     <ErrorBanner
      ref="errorBanner"
     />

     <ButtonDefault
       class="mt-4 px-4 bg-blue-500 hover:bg-blue-600 inline-block rounded"
        @clicked="$refs.autoform.submit()"> Submit </ButtonDefault>
       
 
   

   </DashboardPage>


</template>


<script>

import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import DashboardPage from '../DashboardPage.vue';
import RestAPIHelper, {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import {connectedToWeb3} from '@/js/ethereum-store-helper'

import FrontendHelper from '@/js/frontend-helper';

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'
import ErrorBanner from '@/views/elements/ErrorBanner.vue'

import AutoForm from '@/views/components/form/autoform.vue' 

export default {
    name: "EndpointNew",
    props: [],
    components: {
      DashboardPage,
      ErrorBanner,
      GenericTable,
      InfoPane,
      ButtonDefault,
      AutoForm},
        
  
    data() {
        return {
            
        };
    },
    

  created() {


    
 
  },
  async mounted () {

     
  },
  methods: {
     
    routeTo,

 


    renderError(msg){
      this.$refs.errorBanner.renderError(msg)
    },

  },
};
</script>
