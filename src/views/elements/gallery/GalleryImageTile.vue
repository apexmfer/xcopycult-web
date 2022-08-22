<template>
  <div @click="routeTo($router,hyperlink)" class="w-1/4 cursor-pointer select-none text-center inline-block m-4 relative "    >

    <img v-bind:src="imageURL" width="128" height="128" style="margin: 0 auto;" />


    <div v-if="overlayShown" class="w-full h-full absolute left-0 top-0 text-white " style="background:#2226; pointer-events:none;"> 
      <div class="absolute w-full text-center p-2" style="top:40%;">  {{type.label}} </div>
    </div>

    <div class="border-2 border-gray-200"> 
       {{ title }} 
       
    </div>
      
  </div>
</template>


<script>



import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'

export default {
  name: 'GalleryImageTile',
  props: ['imageURL',  'title', 'hyperlink'],
  data() {
    return {
      overlayShown: false
    }
  },
  created(){

  },
  methods: {
      routeTo,
      
      
  }
}
</script>
