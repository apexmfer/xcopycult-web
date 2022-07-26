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



      <input
      v-if="fieldConfig.type == 'text'"
      class="p-2 rounded  border-2 border-neutral-300 w-full"
      :type="fieldConfig.type" 
      :ref="'field_'+fieldConfig.modelname"
      :disabled="fieldConfig.disabled" 
      v-model="fieldsData[fieldConfig.modelname]" 
      />
 

     <input
      v-if="fieldConfig.type == 'boolean'"
      class="p-2 rounded  border-2 border-neutral-300 m-2"
      type="checkbox" 
      :ref="'field_'+fieldConfig.modelname"
      :disabled="fieldConfig.disabled" 
      v-model="fieldsData[fieldConfig.modelname]" 
      />



     <MarkdownEditor
      v-if="fieldConfig.type == 'markdown'"
      class="p-2 rounded  border-2 border-neutral-300 m-2"
      
      :ref="'field_'+fieldConfig.modelname"
      :disabled="fieldConfig.disabled" 
      v-model="fieldsData[fieldConfig.modelname]" 
      />
 


      <AttributeList
      v-if="fieldConfig.type == 'attributelist'"
      class="p-2 rounded  border-2 border-neutral-300 w-full"
      :type="fieldConfig.type" 
      :ref="'field_'+fieldConfig.modelname"
      :disabled="fieldConfig.disabled" 
      v-model="fieldsData[fieldConfig.modelname]" 
      />



      <select  
      v-if="fieldConfig.type == 'select'"
       class="p-2 rounded  border-2 border-neutral-300 w-full"
       v-model="fieldsData[fieldConfig.modelname]" 
       :ref="'field_'+fieldConfig.modelname"
       
       >          
          <option v-for="opt of fieldConfig.options" :key="opt.value" :value="opt.value">{{opt.label}}</option>
        </select>
 

       <div v-if="fieldConfig.type == 'images'" class="flex">
        <ImageUploadTile
         v-for="i in fieldConfig.quantity"
        :key="i"
        :modelname="fieldConfig.modelname.concat(`-${i}`)"
        :filesData="filesData"
        @onUploadSuccess="onImageUploaded"   

         @onError="onError"        
        /> 
         
        </div>

    
     
    </div>
     
 
</template>


<script>

import MarkdownEditor from './markdowneditor_field.vue'
import AttributeList from './attributelist_field.vue'
import ImageUploadTile from './imageuploadtile.vue'

export default {
  name: 'AutoFormField',
  props: [ 'fieldConfig' , 'fieldsData', 'filesData'],
  components: {
    ImageUploadTile,
    AttributeList,
    MarkdownEditor
   },
  data() {
    return {
       
    }
  },
  mounted(){
      

  },
  methods: {

      onImageUploaded(file){
        this.$emit('onImageUploaded',file)
      },

      onError(msg){
        this.$emit('onError',msg)
      }
 
        
     
  }
}
</script>
