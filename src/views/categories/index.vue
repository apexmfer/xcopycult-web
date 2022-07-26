<template>
   
  <ForumLayout 
     
   > 
  

   

    <div class="flex flex-row"> 

        <CategoriesNavbar> </CategoriesNavbar>
        

        ,<div class="flex-grow text-right">
          <ButtonDefault class=" inline-block  text-gray-900 border-2 border-neutral-500" @clicked="routeTo($router,{name:'threadnew'})">   New Thread  </ButtonDefault>

          </div>
    </div>


    <div class=" ">
        
       


    </div> 


    <div
     class="my-16"
     >
         
        
        
    </div> 

 


   </ForumLayout>


</template>


<script>

import AppHelper, {routeTo} from '@/js/app-helper'
 

 
import ForumLayout from '../forum/ForumLayout.vue';
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import FrontendHelper from '@/js/frontend-helper';

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'

  import CategoriesNavbar from "@/views/components/categories/CategoriesNavbar.vue"

 
export default {
  name: "EndpointIndex",
  props: [],
  components: {
    ForumLayout,
  CategoriesNavbar,
  GenericTable,
  InfoPane,
  ButtonDefault},
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

      let sessionToken = FrontendHelper.getSessionToken()

      let response = await resolveRoutedApiQuery('getEndpoints', {sessionToken})

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
