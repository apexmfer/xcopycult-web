<template>
   
   <div class="my-4 mx-2 border-neutral-500" :class="{'border-l-2':highlighted==true}">
    <div
     class="p-2 select-none cursor-pointer hover:bg-neutral-200 text-neutral-800" 
     v-bind:class="customClass" @click="onClicked()">
           
                  <slot></slot>
           
    </div> 
  </div>
  
</template>


<script>
 
 

export default {
  name: "Button_H",
  props: ['customClass','highlighted'],
  components: { },
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
    onClicked(){
        this.$emit('clicked');
    }
 
    
  },
};
</script>
