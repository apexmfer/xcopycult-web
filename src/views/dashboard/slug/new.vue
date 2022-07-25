<template>
   
   <DashboardPage
    mainTitle="Create a new QR Code"
   > 
 
 
 

 
    <AutoForm
      
        ref="autoform"

        v-bind:formConfig="{
            
            fields: [
                {modelname: 'endpointURL', label:'Endpoint URL', type: 'text'},  
            ],
            submitRoute: 'createEndpoint'

            
            
            
            }"

          @onPostSuccess="routeTo($router,{name:'dashboardshopindex'})"
          @onPostFailed="renderError"
          @onError="renderError"
    />

     <ErrorBanner
      ref="errorBanner"
     />

     <ButtonDefault @clicked="$refs.autoform.submit()"> Submit </ButtonDefault>
      
  
 
   

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
    name: "ShopNew",
    props: [],
    components: {
      DashboardPage,
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
            activeAccount: undefined
        };
    },
    

  created() {


    
 
  },
  async mounted () {

    
      this.activeAccount = this.$store.state.web3Storage.account 
  },
  methods: {
     
    routeTo,


    connectedToWeb3,


    renderError(msg){
      this.$refs.errorBanner.renderError(msg)
    },

  },
};
</script>
