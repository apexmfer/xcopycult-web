<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-row"> 


        Gallery !

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
