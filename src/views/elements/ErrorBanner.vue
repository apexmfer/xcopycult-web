<template>

    <div class="p-2 px-8"> 
    <div v-if="message" class="my-2 p-2  w-full block rounded select-none  hover:bg-red-300 bg-red-400 text-neutral-700" v-bind:class="customClass"  >
           
      Error:  {{message}}   
           
    </div> 
    </div> 
   
  
</template>


<script>
 
 const MaxErrorTime = 5000;

export default {
  name: "ErrorBanner",
  props: ['customClass'],
  components: { },
  data() {
    return {
        message: undefined,
        lastErrorAt: undefined
    };
  },

  created() {
     setInterval(this.updateError, 1000)
  },

  methods: {
    renderError(msg){
         this.message = msg;
         this.lastErrorAt = Date.now() 
    },
    updateError(){

      if( this.lastErrorAt < Date.now() - MaxErrorTime  ){
        this.clearError()
      }
    },
    clearError(){
      this.message = undefined 
    }
  
    
  },
};
</script>
y