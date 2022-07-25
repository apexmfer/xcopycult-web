<template>
  
    <div class="flex cursor-pointer" >

      

      <input      
      class="p-2 rounded   border-2 border-neutral-300"
      :type="'file'"       
      :name="modelname"
      :ref="'field_'+modelname"
      accept="image/*"
      @change="onFilePicked"
      hidden
       />

    <div class="p-2 border-2 border-neutral-300 relative " >

     <canvas
       @click="chooseFiles()"
      :ref="'canvas_'+modelname"
      class="p-2  "
      width="50px"
      height="50px"
      
      />

      <div v-if="uploadingBusy" class="absolute w-full h-full pointer-events-none" style="background: #3333; top:0 ; left: 0" > 
            
      </div> 


       <div v-if="hasImageFileActive()" @click.prevent="reset" class="absolute px-1 bg-neutral-800 text-neutral-200 font-xs " style="background: #3333; top:0 ; right: 0" > 
          x  
      </div> 

    </div>


    </div>
     
 
</template>


<script> 

 
import AppHelper, {routeTo,getWeb3StorageData} from '@/js/app-helper'
 
import {resolveURIFromRouteName, resolveRestQueryAsserted} from '@/js/rest-api-helper.ts'



export default {
  name: 'ImageInputTile',
  props: [ 'modelname' , 'filesData'],
  components: { },
  data() {
    return {
       uploadingBusy: false 
    }
  },
  mounted(){
      

  },
  methods: {
 

        async onFilePicked (event) {

            const files = event.target.files

            if (!files.length) return;

            let imagefile = files[0]

            //generate canvas preview 
            console.log('generate canvas preview ', imagefile)
            await this.renderPreview(  imagefile)

            this.$emit('picked',event)


            //upload the image and then 

            
            this.uploadPickedFile( imagefile  )
            
        },

        async uploadPickedFile( imagefile ){

          this.uploadingBusy = true 


          let web3StorageData = this.getWeb3StorageData(this.$store)

          let formData = new FormData() 
          formData.set(this.modelname, imagefile, imagefile.name);           
          formData.set('publicAddress', web3StorageData.account)

         
          let submitURI = resolveURIFromRouteName( 'createImage' )
           

          let requestResponse = await resolveRestQueryAsserted(submitURI, formData)



           this.uploadingBusy = false 

           if(requestResponse.success){

              //append the file field data to parent registry
              let imageId = requestResponse.data._id 
 

              let fileFieldName = 'field_'.concat(this.modelname)
              this.filesData[ fileFieldName  ] = { name: fileFieldName, imageId }



            this.$emit('onUploadSuccess', requestResponse.data )
          }else{

            await this.reset( )
            
            this.$emit('onError', requestResponse.error)
          }
 

        },

        async reset( ){ 
             

            let fileFieldName = 'field_'.concat(this.modelname)
            await this.renderPreview( )
            delete this.filesData[ fileFieldName ]// = undefined  //delete 
            this.$forceUpdate(); 
        },

        hasImageFileActive(){

            let fileFieldName = 'field_'.concat(this.modelname)
             
            return !!this.filesData[ fileFieldName ] 

        },



        async renderPreview( imagefile){

          let canvas = this.$refs['canvas_'.concat(this.modelname)]
          const ctx = canvas.getContext('2d');

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if(!imagefile){
            return
          }

          var fReader = new FileReader();

          await new Promise((resolve, reject) => {
            fReader.onload = function(event){
                var img = new Image();
                img.onload = function(){ 
                    ctx.drawImage(img,0,0,img.width, img.height, 0,0,canvas.width, canvas.height );
                    resolve() 
                }
                img.src = event.target.result;
            }

            fReader.readAsDataURL(  imagefile  );
          })
 
        
        },

         chooseFiles() {
          let inputName = 'field_'.concat(this.modelname)
          this.$refs[inputName].click()
        },  


      getWeb3StorageData

        
     
  }
}
</script>
