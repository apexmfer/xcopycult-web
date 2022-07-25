<template>

  <PrimaryLayout> 
   
   


      <div class=" section  mb-4">
        <div class="autospacing w-container">
          <div> File not found! </div>
          <router-link to="/"> -> Go Home</router-link>

          </div>
      </div>
 

 
  </PrimaryLayout> 
</template>


<script>



import PrimaryLayout from './PrimaryLayout.vue';
 



export default {
  name: 'NotFound',
  props: [],
  components: {PrimaryLayout},
  data() {
    return {
      
    }
  },
  created: function () {
   
    
  }, 
  methods: {
      
  }
}
</script>
