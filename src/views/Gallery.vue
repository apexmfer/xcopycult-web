<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col"> 

   

      <div class=" py-24 ">
      
        <GalleryImageTile
          v-for="assetData of digitalAssetsArray"
          :key="assetData.digitalAssetId"
          :title="assetData.title"
          :hyperlink="{name:'digitalassetshow', params:{id: assetData.digitalAssetId}}"
          :imageURL="getImageStoragePath(assetData.imageData.filename)"
         />

      </div>

      <div class="flex flex-row  py-12 w-full ">
        <div class="flex-grow"></div>
        <div class="">  
          <ButtonDefault 
           :customClass="' w-full mt-8 bg-purple-500 border-2 border-neutral-600 hover:bg-purple-400 text-gray-200'"  
           @clicked="routeTo($router,{name:'digitalassetsnew'})" 
           > Add Missing XCOPY Assets </ButtonDefault>

         
        </div>
      </div>


     </div>


  


   </PrimaryLayout>
  </div>
</template>


<script>
 

import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
import {getImageStoragePath,getRouteTo} from '@/js/frontend-helper'
 
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper'
import PrimaryLayout from './PrimaryLayout.vue';
 
import ButtonDefault from '@/views/elements/button_default.vue'
import GalleryImageTile from '@/views/elements/gallery/GalleryImageTile.vue'
export default {
  name: "Home",
  props: [],
  components: { PrimaryLayout, ButtonDefault, GalleryImageTile},
  data() {
    return {
        digitalAssetsArray: [] 
    };
  },

  async created() {
    await this.loadDigitalAssets()
     
  },

  methods: {
    routeTo,
    getImageStoragePath,
    getRouteTo,

    async loadDigitalAssets(){

      let offset = "0"

      let assetsResponse = await resolveRoutedApiQuery('getDigitalAssets',{offset})

      console.log({assetsResponse})

      if(!assetsResponse.success){
        console.error(assetsResponse.error)
        return 
      }

      this.digitalAssetsArray=[]

      for(let asset of assetsResponse.data){

        let assetData = Object.assign({},asset)

        if(assetData && assetData.imageData){  

          this.digitalAssetsArray.push(assetData)
        }


      }
    }
 
    
  },
};
</script>
