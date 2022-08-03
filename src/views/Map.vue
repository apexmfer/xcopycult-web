<template>
  <div>
   <PrimaryLayout> 

    <div class="section   flex flex-col mb-16" style="height:800px"> 
        <div> Map </div>

        <MapContainer 
        style="width: 100%; height: 100%"
        />


     </div>



   </PrimaryLayout>
  </div>
</template>


<script>
 

 
import PrimaryLayout from './PrimaryLayout.vue';
 
 import MapContainer from '@/views/components/MapContainer.vue'

export default {
  name: "Home",
  props: [],
  components: { PrimaryLayout, MapContainer},
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
