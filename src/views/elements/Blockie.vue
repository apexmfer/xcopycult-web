<template>
    
    <img v-if="imageSource" v-bind:src="imageSource" v-bind:width="width"/> 

</template>

<script>
import makeBlockie from 'ethereum-blockies-base64';



export default ({
    name: 'Blockie',
    props: ['publicAddress', 'width'],
    watch:{
        publicAddress: function(newVal, oldVal){
            this.rebuildImage()
        }
    },
    data () {
        return {imageSource: null}
        
    },
    mounted(){

        this.rebuildImage()

           
    },
    methods: {
        rebuildImage(){
            this.imageSource = makeBlockie(this.publicAddress);
 
        }
      

    }
})
</script>
