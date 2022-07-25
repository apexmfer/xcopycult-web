<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-row"> 
    <div class=" w-1/2 text-white py-48 text-center">

       <img src="@/assets/images/gofast.png" style="width:80%;"  class="centered p-4 border-neutral-500 border-2" /> 

      <a href="https://en.wikipedia.org/wiki/Pentagon_UFO_videos" class="p-4 my-4"> US Pentagon Video 'GoFast' </a>

    </div>

     <div class=" w-1/2   text-white">

       <CtaAnnotated />

     </div>

     </div>


  <div class="section text-white my-8 hidden">
    <div class="flex flex-row container">
      <div class="flex-grow"> </div>
       <div>
         <a href="https://chain.link">
            <img src="@/assets/images/chainlink_badge_blue.svg" width="200px"  /> 

          </a>
      </div>
    </div>
  </div>
     


   </PrimaryLayout>
  </div>
</template>


<script>
 

 
import PrimaryLayout from './PrimaryLayout.vue';
 
 import CtaAnnotated from '@/views/components/CtaAnnotated.vue'

export default {
  name: "Home",
  props: [],
  components: { PrimaryLayout, CtaAnnotated},
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
   

    getRouteTo(dest) {
      return FrontendHelper.getRouteTo(dest);
    },

    
  },
};
</script>
