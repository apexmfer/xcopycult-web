<template>
   
  <ForumLayout 
     
   > 
   

    <div class="flex flex-row"> 

          <div   v-if="activeCategory" class="font-semibold text-xl capitalize "> {{activeCategory.name}} </div>
        

        ,<div class="flex-grow text-right">
          <ButtonDefault class=" inline-block  text-gray-900 border-2 border-neutral-500" @clicked="routeTo($router,{name:'threadnew'})">   New Thread  </ButtonDefault>

          </div>
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
  name: "CategoryShow",
  props: [],
  components: {
    ForumLayout,
  CategoriesNavbar,
  GenericTable,
  InfoPane,
  ButtonDefault},
  data() {
    return {
        categoriesList: [] ,
        activeCategory: undefined 
    };
  },
 
  created() { 
 
  },
  async mounted () {

      await this.loadCategories()

      let currentSlug = this.$route.params.slug

      for(let category of this.categoriesList){
        if(currentSlug && category.urlSlug == currentSlug.toLowerCase()){
          this.activeCategory = category;
          break;
        }

      }
  },
  methods: {
     
    routeTo, 


    async loadCategories(){

      let response = await resolveRoutedApiQuery('getCategories', {})

      let categoriesArray = response.data
        
      console.log({categoriesArray})


      this.categoriesList = []

      if(categoriesArray){
         categoriesArray.map( x => this.categoriesList.push( 
            {label: x.name, name: x.name, urlSlug: x.urlSlug }  ))
      } 

      console.log('categoriesList',this.categoriesList)


    },

    onClickedCategory(row){ 

     

      if(!row || !row.categoryId){
        console.error('no category id')
        return 
      }

      this.routeTo(this.$router,
       {name: 'categoryshow', 
       params: {slug:row.urlSlug}} )

    }
  },
};
</script>
