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

    <div class="p-2 border-2 border-neutral-300" @click="chooseFiles()">

     <canvas
      :ref="'canvas_'+modelname"
      class="p-2  "
      width="50px"
      height="50px"
      
      />

    </div>


    </div>
     
 
</template>


<script>

 /*
DEPRECATED 
 */

export default {
  name: 'ImageInputTile',
  props: [ 'modelname' ],
  components: { },
  data() {
    return {
       
    }
  },
  mounted(){
      

  },
  methods: {

          onFilePicked (event) {

            const files = event.target.files

            if (!files.length) return;

            let imagefile = files[0]

            //generate canvas preview 
            console.log('generate canvas preview ', imagefile)
            this.renderPreview(  imagefile)

            this.$emit('picked',event)
        },



        async renderPreview( imagefile){

          let canvas = this.$refs['canvas_'.concat(this.modelname)]
          const ctx = canvas.getContext('2d');

          var fReader = new FileReader();
          fReader.onload = function(event){
              var img = new Image();
              img.onload = function(){ 
                  ctx.drawImage(img,0,0,img.width, img.height, 0,0,canvas.width, canvas.height );
              }
              img.src = event.target.result;
          }

          fReader.readAsDataURL(  imagefile  );
 
        
        },

         chooseFiles() {
          let inputName = 'field_'.concat(this.modelname)
          this.$refs[inputName].click()
        },

        
     
  }
}
</script>
