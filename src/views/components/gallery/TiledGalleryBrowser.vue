<template>



   <div class=" py-24 ">

       <div v-if="!digitalAssetsArray">
           
                <LoadingSpinner
                  
                 />

      </div>

         <div v-if="digitalAssetsArray && digitalAssetsArray.length==0">
           
                No results.

      </div>

       <div v-if="digitalAssetsArray && digitalAssetsArray.length>0">
      
        <GalleryImageTile
          v-for="assetData of digitalAssetsArray"
          :key="assetData.digitalAssetId"
          :title="assetData.title"
          :hyperlink="{name:'digitalassetshow', params:{id: assetData.digitalAssetId}}"
          :imageURL="getImageStoragePath(assetData.imageData.filename)"
         />


         <PaginationBar 
              :currentPage="currentPage"
              :maxPages="maxPages"
              :setCurrentPageCallback="setCurrentPageCallback"
             />

        </div>

      </div>


</template>

<script>


import {getImageStoragePath,getRouteTo} from '@/js/frontend-helper'
 
import GalleryImageTile from '@/views/components/gallery/GalleryImageTile.vue'

import LoadingSpinner from '@/views/elements/LoadingSpinner.vue'

import PaginationBar from '@/views/components/nav/PaginationBar.vue'
 
export default {
  name: 'TiledGalleryBrowser',
  props: [ 'digitalAssetsArray' ,'currentPage', 'setCurrentPageCallback'],
  components:{LoadingSpinner,GalleryImageTile,PaginationBar },
  data() {
    return {
        maxPages:5 //for now 

       
    }
  }, 
    
  created(){
     
     
 
  },
  methods: {
     getImageStoragePath,
     getRouteTo
   
         
  }
}
</script>
