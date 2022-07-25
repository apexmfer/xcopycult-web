<template>
   
    <div class="p-8 border-2 border-neutral-700 bg-neutral-300 rounded text-neutral-600 " v-bind:class="customClass"  >
           
        <slot></slot>
           
    </div> 
   
  
</template>


<script>
 
 

export default {
  name: "infopane",
  props: ['customClass'],
  components: { },
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
     
    
  },
};
</script>
