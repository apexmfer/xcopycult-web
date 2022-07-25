<template>
  
   <div  class=" w-full " >


     <div>
      <div class="text-sm inline-block "> {{fieldConfig.label}} </div> 

          <div 
          v-for="tag of fieldConfig.tags" 
           :key="tag"
           class="inline-block text-xs px-1 rounded bg-neutral-400 text-neutral-100 mx-4"
           
           > {{tag}} </div>
     </div>


      <div  class="p-2 rounded  border-2 border-neutral-300 w-full" style="min-height:36px" >         
        {{fieldConfig.default}}
      </div> 

 
  
 
 
    
     
    </div>
     
 
</template>


<script>

  

export default {
  name: 'AutoField',
  props: [ 'fieldConfig'  ],
  components: {
     
   },
  data() {
    return {
       
    }
  },
  mounted(){
      

  },
  methods: {

    
        
     
  }
}
</script>
