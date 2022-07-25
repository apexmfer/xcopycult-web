<template>
  <div class=" ">
       
    <div class="flex flex-row">

      <div class="flex-grow "> 

         <img 
             v-if="getFocusedImage()"
            :src="getImageURL(getFocusedImage().filename)"
            class="w-full"
         />

      </div>

      <div class="   flex-column m-4 p-2 border-2 " style="min-width:150px" > 

          <div v-for="(item, index) in imageDataArray" 
          :key="index"
          @click="setFocusIndex(index)" 

          class="m-2   border-2 border-black hover:border-neutral-400 cursor-pointer w-full overflow-hidden"
            style="height:100px;width:100px "
           :class="{'border-purple-500 border-4': (index == focusedIndex)}"
          >
           
              <img 
                :src="getImageURL(item.filename)"
                class="block  overflow-hidden "
                width="100px" 
                height="100px" 
            /> 
        
      </div> 

    </div>

        

            
        </div> 
        
     
  </div>
</template>


<script>

 
 import {getImageURL} from '../../js/frontend-helper'
 

export default {
  name: 'MultiImageGallery',
  props: ['imageDataArray'],
  data() {
    return {
      focusedIndex: 0
    }
  },
   
  mounted(){
      
      this.imageDataArray.push( this.imageDataArray[0])

  },
  methods: {
        getImageURL,
        
        setFocusIndex(idx){
          this.focusedIndex = idx ;

          console.log('new f index', idx )
        },


        getFocusedImage(){

          if(!this.imageDataArray) return undefined 
          
          return this.imageDataArray[this.focusedIndex]
        }
  }
}
</script>
