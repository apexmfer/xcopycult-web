<template>
   <div class="  text-md">
    <div class="my-2 p-2 inline-block rounded select-none cursor-pointer" v-bind:class="customClass" @click="onClicked()">
           
                  <slot></slot>
           
    </div> 
    </div>
  
</template>


<script>
 
 

export default {
  name: "Button_H",
  props: ['customClass'],
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
y