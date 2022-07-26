<template> 

 
    <div class="flex flex-row"> 
          
           <GenericDropdown
            class="  inline-block  " 
            @clicked="routeTo($router,{name:'dashboardendpointnew'})"
            :optionList="allCategories"
            >
            
            
             Categories
              
            </GenericDropdown>


             
           <ButtonDefault class="mx-2  inline-block  text-gray-900 border-2 border-neutral-500" @clicked="routeTo($router,{name:'recentactivity'})">  Recent Activity  </ButtonDefault>
          
        </div> 



</template> 


<script>
  

 
 import GenericDropdown from "@/views/components/GenericDropdown.vue"
import ButtonDefault from "@/views/elements/button_default.vue"


export default {
  name: 'CategoriesNavbar',
  props: [   ],
  components: {  GenericDropdown, ButtonDefault},
  data() {
    return {
         allCategories: [{label:"observations",name:"observations"}]

    }
  },
  watch: {
    
  },


  created(){
     
       
  },
  mounted(){

       
      
  },
  methods: {
    


  }
}
</script>
