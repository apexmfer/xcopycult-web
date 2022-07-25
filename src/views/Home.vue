<template>
  <div>
   <PrimaryLayout> 

    <div class="section text-white">

     <CtaAnnotated />

    </div>

     <div class="section text-white">

     

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
