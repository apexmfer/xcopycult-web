<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col"> 

   

      <div class=" py-24 ">
      
        <GalleryImageTile
        
          title="Guzzler"
          :hyperlink="{name:'digitalassetshow', params:{id: 2}}"
          :imageURL="getImageStoragePath('77bc994e88d7e33e1ea2b6a8912c4d5463ed7212fa8cc422cbe616e75db3ac2f.gif')"
        
         />

      </div>

      <div class="flex flex-row  py-12 w-full ">
        <div class="flex-grow"></div>
        <div class="">  
          <ButtonDefault 
           :customClass="' w-full mt-8 bg-purple-500 border-2 border-neutral-600 hover:bg-purple-400 text-gray-200'"  
           @clicked="routeTo($router,{name:'digitalassetsnew'})" 
           > Add XCOPY Digital Assets </ButtonDefault>

         
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

    loadDigitalAssets(){

      let offset = 0 

      let assetsResponse = await resolveRoutedApiQuery('getDigitalAssets',{offset})

      console.log({assetsResponse})
    }
 
    
  },
};
</script>
