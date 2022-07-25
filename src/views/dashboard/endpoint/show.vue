<template>
   
   <DashboardPage
    mainTitle="Endpoint" 
    > 
 
 
  

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
    name: "EndpointShow",
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
