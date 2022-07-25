<template>
  <form ref="form"  > 


    <AutoField  v-for="item of formConfig.fields" 
      :key="item.modelname" 
      :fieldConfig="item" 
       class="p-2 my-2 w-full" 

       
      />

      <div v-for="group of formConfig.groups"  
      :key="group.groupname" class="flex flex-row" :class="group.customClass"
      >

        <AutoField  v-for="item of group.fields" 
        :key="item.modelname" 
        :fieldConfig="item" 
        class="p-2 my-2 w-full " 

         
        />
          
        
       </div>

      


  </form>
</template>


<script>
 

import AppHelper, {routeTo,getWeb3StorageData} from '@/js/app-helper'
 import FrontendHelper  from '@/js/frontend-helper'

 
import AutoField from './autofield.vue'

import {resolveURIFromRouteName, resolveRestQueryAsserted} from '@/js/rest-api-helper.ts'


 

export default {
  name: 'AutoForm',
  props: ['formConfig'],
  components: {AutoField},
  data() {
    return {
      
    }
  },
  created(){
        

  },
  methods: {


   
      routeTo,
      getWeb3StorageData

  }
}
</script>
