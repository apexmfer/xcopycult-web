<template>
   
  <DashboardPage 
    mainTitle="My Shops" 
   > 
  

   
    <div>
        
        <GenericTable

        :topologyArray="[{label:'',value:'name'}]"
        :dataArray="endpointsList"
        @clicked="onClickedEndpoint"
        
        > </GenericTable> 


    </div> 

 


   </DashboardPage>


</template>


<script>

import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import DashboardPage from '../DashboardPage.vue';
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import {getSessionToken} from '@/js/frontend-helper';

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'

 
 
export default {
  name: "EndpointIndex",
  props: [],
  components: {DashboardPage,GenericTable,InfoPane,ButtonDefault},
  data() {
    return {
        endpointsList: [] 
    };
  },
 
  created() { 
 
  },
  async mounted () {

      this.loadEndpoints()
  },
  methods: {
     
    routeTo, 


    async loadEndpoints(){

      let sessionToken = getSessionToken()

      let response = await resolveRoutedApiQuery('getEndpoints', {sessionToken})

      console.log('got response',response)
      
      
      let myEndpointsList = response.data
        
      console.log({myEndpointsList})


      this.endpointsList = []

      if(myEndpointsList){
         myEndpointsList.map( x => this.endpointsList.push(  x  ))
      } 

      console.log('endpointsList',this.endpointsList)


    },

    onClickedEndpoint(row){ 

     

      if(!row || !row.endpointId){
        console.error('no endpoint id')
        returnshop
      }

      this.routeTo(this.$router,
       {name: 'dashboardendpointshow', 
       params: {endpointId:row.endpointId}} )

    }
  },
};
</script>
