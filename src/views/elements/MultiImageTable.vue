<template>
  <div class=" ">
       
    <div class="flex flex-col">


       <div v-for="imageData of imageDataArray" :key="imageData.filename" class="m-4 p-2 block border-2 border-black flex flex-row overflow-hidden">
           
          <img 
            :src="getImageURL(imageData.filename)"
            width="50px"
         />

        <div class="trucate mx-4 overflow-hidden">  {{ imageData.filename }}  </div>  
        
      </div>  


        <div v-if="!imageDataArray || imageDataArray.length == 0" v-cloak>
          No records found.
        </div>

            
    </div> 
        
     
  </div>
</template>


<script>

 
 import {getImageURL} from '../../js/frontend-helper'
 

export default {
  name: 'MultiImageTable',
  props: ['imageDataArray'],
  data() {
    return {
      focusedIndex: 0
    }
  },
   
  mounted(){
      
      

  },
  methods: {
        getImageURL,


        getFocusedImage(){

          if(!this.imageDataArray) return undefined 
          
          return this.imageDataArray[this.focusedIndex]
        }
  }
}
</script>
