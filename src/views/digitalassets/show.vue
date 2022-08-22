<template>
   
   <PrimaryLayout> 
 
    <div class="section w-container flex flex-col my-16 "> 

'     

       <div v-if="assetData" class="flex flex-row">

         <div class="flex-grow">
            <div class="text-2xl">  {{assetData.title}}  </div>
            <div class="text-md text-gray-500">  {{assetData.description}}  </div>
        </div>

        <div class="w-1/2">
        <img :src="getImageStoragePath(assetData.imageData.filename)" />
          </div>
      </div>
    

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
 


import {getImageStoragePath,getRouteTo} from '@/js/frontend-helper'
 

import {isSignedIn} from '@/js/frontend-helper'

export default {
    name: "DigitalAssetShow",
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
            assetData: undefined, 
            
        };
    },
    

  created() {


    
 
  },
  async mounted () {

     
      this.loadDigitalAssetData()
    
  },
  methods: {
     
    routeTo, 
    getImageStoragePath,

 
    async loadDigitalAssetData(){


      const digitalAssetId = this.$route.params.id

      let response = await resolveRoutedApiQuery('getDigitalAsset', {digitalAssetId})

      console.log({response})
      this.assetData = response.data        
       

      console.log('assetData',this.assetData)
    },

 


    renderError(msg){
      this.$refs.errorBanner.renderError(msg)
    },

  },
};
</script>
