<template> 

 
    <div class="flex flex-row"> 
          
           <GenericDropdown
            class="  inline-block  " 
            :onSelectCallback="onCategorySelect"
            

            :optionList="categoriesList"
            >
            
            
             Categories
              
            </GenericDropdown>


             
           <ButtonDefault class="mx-2 hidden inline-block  text-gray-900 border-2 border-neutral-500" @clicked="routeTo($router,{name:'recentactivity'})">  Recent Activity  </ButtonDefault>
          
        </div> 



</template> 


<script>
  
import AppHelper, {routeTo} from '@/js/app-helper'
 

 
 import GenericDropdown from "@/views/components/GenericDropdown.vue"
import ButtonDefault from "@/views/elements/button_default.vue"


export default {
  name: 'CategoriesNavbar',
  props: [  'categoriesList' ],
  components: {  GenericDropdown, ButtonDefault},
  data() {
    return {
      //   allCategories: [{label:"observations",name:"observations"}]

    }
  },
  watch: {
    
  },


  created(){
     
       
  },
  mounted(){

       
      
  },
  methods: {
    routeTo,

      onCategorySelect(optionData){

          this.routeTo(this.$router,{name:'categoryshow',params:{slug:optionData.urlSlug}})

           
      }

  }
}
</script>
