<template>
  
   <div id="editor" style="min-height:600px" >

      <div class="flex flex-column">

        <div class="flex flex-grow"></div>
         
          <span class="cursor-pointer select-none text-neutral-500 hover:text-purple-400 p-2 m-2 " @click="changeViewMode">   Change View Mode  </span>
        </div>

    <div class="flex flex-column">
        <textarea v-if="viewMode == 0 || viewMode == 1" class="flex flex-grow border-2 border-neutral-500" style="min-height:600px" :value="input" @input="update"  ></textarea>
        <div class="flex flex-grow">
        <div  v-if="viewMode == 0 || viewMode == 2"  class="  markdown-body"   v-html="compiledMarkdown"></div>
        </div>
    </div>

     
    </div>
     
 
</template>


<script>

  
  //  https://github.com/jeremyjaydan/md.jeremyjaydan.dev



// DOMPurify.sanitize(marked.parse(`<img src="x" onerror="alert('not happening')">`));
//https://v2.vuejs.org/v2/examples/


import {marked} from 'marked'

export default {
  name: 'MarkdownEditorField',
  props: [  'modelname' ,'value' ],
  components: {
     
   },
  data() {
    return {
      input: "# New Topic",
      viewMode: 0,
       
    }
  },
   computed: {
          compiledMarkdown: function() {
            return marked(this.input, { sanitize: true });
          }
        },
  mounted(){
      
    this.$emit('input', this.input);
  },
  methods: {

      changeViewMode(){
        this.viewMode = this.viewMode+1

        if(this.viewMode > 2) this.viewMode = 0

      },
  
      update: _.debounce(function(e) {
        this.input = e.target.value; 
        
        this.$emit('input', this.input);
      }, 300)
        
 
        
     
  }
}
</script>
