<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col"> 

   

    <TiledGalleryBrowser 
    :digitalAssetsArray="digitalAssetsArray"
    :totalDigitalAssetsCount="totalDigitalAssetsCount"
    :currentPage="currentPage"
    :setCurrentPageCallback="setCurrentPage"
    
    />



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
import {getRouteTo} from '@/js/frontend-helper'
 
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper'
import PrimaryLayout from './PrimaryLayout.vue';
 
import TiledGalleryBrowser from '@/views/components/gallery/TiledGalleryBrowser.vue'
import ButtonDefault from '@/views/elements/button_default.vue'
export default {
  name: "Home",
  props: [],
  components: {
     PrimaryLayout,
      ButtonDefault,  
      TiledGalleryBrowser
      },
  data() {
    return {
        digitalAssetsArray: undefined ,
        currentPage: 1,
        totalDigitalAssetsCount: 0
    };
  },

  async created() {

    this.currentPage = (this.$route.params.page && !isNaN(this.$route.params.page)) ? parseInt(this.$route.params.page) : 0


    await this.loadDigitalAssets()
     
  },

  methods: {
    routeTo,
    
    getRouteTo,

    async loadDigitalAssets(){

      let page = Math.max(1, parseInt(this.currentPage) )
      
      let offset = 50 * (page-1)

      let limit =  50

      let assetsResponse = await resolveRoutedApiQuery('getDigitalAssets',{offset,limit})

      console.log({assetsResponse})

      if(!assetsResponse.success){
        console.error(assetsResponse.error)
        return 
      }

      this.digitalAssetsArray=[]

      for(let asset of assetsResponse.data.digitalAssets){

        let assetData = Object.assign({},asset)

        if(assetData && assetData.imageData){  

          this.digitalAssetsArray.push(assetData)
        }


      }


      this.totalDigitalAssetsCount = assetsResponse.data.count
    },


    setCurrentPage(page){      
      this.currentPage = page 

      this.loadDigitalAssets()

      this.$router.push({name:"gallery", params: {page}})
    }
 
    
  },
};
</script>
