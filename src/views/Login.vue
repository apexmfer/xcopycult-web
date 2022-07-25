<template>
  <div>
   <PrimaryLayout> 

    <div class="section  ">

      
      
      <SimpleLoginCard />



    </div>
 

   

   </PrimaryLayout>
  </div>
</template>


<script>
 

 
import PrimaryLayout from './PrimaryLayout.vue';
import SimpleLoginCard from '@/views/components/SimpleLoginCard.vue'
 

export default {
  name: "Home",
  props: [],
  components: { PrimaryLayout, SimpleLoginCard},
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
