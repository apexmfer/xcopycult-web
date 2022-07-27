<template>
  <form ref="form"  > 


    <AutoformField  v-for="item of formConfig.fields" 
      :key="item.modelname" 
      :fieldConfig="item"
       :fieldsData="fieldsData" 
       :filesData="filesData"
       class="p-2 my-2 w-full" 

       @onImageUploaded="onImageUploaded"
        @onError="onError"
      />

      <div v-for="group of formConfig.groups"  
      :key="group.groupname" class="flex flex-row" :class="group.customClass"
      >

        <AutoformField  v-for="item of group.fields" 
        :key="item.modelname" 
        :fieldConfig="item"
        :fieldsData="fieldsData" 
        :filesData="filesData"
        class="p-2 my-2 w-full " 

        @onImageUploaded="onImageUploaded"
        @onError="onError"
        />
          
        
       </div>

      


  </form>
</template>


<script>

import axios from 'axios';

import AppHelper, {routeTo,getWeb3StorageData} from '@/js/app-helper'
 import {getSessionToken}  from '@/js/frontend-helper'

//import ButtonDefault from '../../elements/button_default.vue'
import ImageTile from './imageinputtile.vue'
import AutoformField from './autoform_field.vue'

import {resolveURIFromRouteName, resolveRestQueryAsserted} from '@/js/rest-api-helper.ts'




/*
  Fields for images and other files will have their data stored in this.formData 

  All other basic fields will store their values in this.fieldsData 

  Use the method 'getFormData' to get an object with combined values of everything 

*/

export default {
  name: 'AutoForm',
  props: ['formConfig'],
  components: {ImageTile,AutoformField},
  data() {
    return {
      fieldsData: {
           

      },
      filesData: {},
      //formData: new FormData(),

      uploadedFilesArray: [] 
    }
  },
  created(){
       for(let field of this.formConfig.fields){

         console.log('load value of ', field )
           this.fieldsData[field.modelname] = field.default  //the default value is loaded in 

       }

  },
  methods: {



        /*
        onFilePicked (event) {

             
            const files = event.target.files

            if (!files.length) return;


            let fieldName = event.target.name 
             

             //const formData = new FormData();
             Array
            .from(Array(files.length).keys())
            .map(x => {
                this.formData.set(fieldName, files[x], files[x].name);
            });


             
        },
*/

        onImageUploaded(file) {

          console.log('parent on image uploaded ')

       


             
        },


      getFieldsData(){

          let result = {} 

            

          for(let [key,value] of Object.entries(this.fieldsData) ){  
              result[key] = value  
          }

         
 
          return result
            
      },

      /*
        Append all of the fields data together into a formData object
      */
      getFormData(){


      //  const reservedFieldNames = ['publicAddress']

        let sessionToken = getSessionToken()

        if(!sessionToken) throw new Error('cant load session token')

        let web3StorageData = this.getWeb3StorageData(this.$store) 

       // let publicAddress = web3StorageData.account

        console.log(JSON.stringify(this.getFieldsData()))
        //make sure no other fields are called 'publicAddress'
        //attach public address 
        let combinedData = Object.assign(this.getFieldsData() , {  sessionToken} )

         //attach pass params 
        if(this.formConfig.passParams){
          combinedData = Object.assign(combinedData, this.formConfig.passParams)
        }
        
       
        let attachableImagesArray = [] 

        
 
        for(let uploadedFile of Object.values(this.filesData) ){
            attachableImagesArray.push( uploadedFile.imageId  )
        }

       
        //add attachImages array 
         let result = new FormData();
  
        for(let [key,value] of Object.entries(combinedData)){

                console.log('values',key,value)
             //if(value){ //dont unset
                  result.set( key,value  )
             //}
            
        }

        result.set( 'attachImages', JSON.stringify(attachableImagesArray)    )
 

        return result

      },
      
      async submit(){ 
 

        let formData = this.getFormData()

          console.log(  'formData' , formData)
         
        let submitURI = resolveURIFromRouteName( this.formConfig.submitRoute )
          console.log('submitURI',submitURI, formData)

        let requestResponse = await resolveRestQueryAsserted(submitURI, formData)

        console.log('submit res', requestResponse)


        if(requestResponse.success){
            this.$emit('onPostSuccess', requestResponse.data )
 
        }else{
            this.$emit('onPostFailed', requestResponse.error)
        }
          
        return requestResponse
         


        //clear the form, re-route to the page that lists 

      } ,


      onError(msg){ 
        this.$emit('onError',msg)
      },

      routeTo,
      getWeb3StorageData

  }
}
</script>
