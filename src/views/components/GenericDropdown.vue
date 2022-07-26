<template> 


<div class="relative inline-block text-left">
  <div>
    <button 
   
     @blur="hide()"
     @mousedown="toggleMenu()" 
    type="button" 
    class="inline-flex 
    justify-center w-full rounded-md border border-gray-300 shadow-sm 
    px-8 py-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      

      <slot></slot>


      <!-- Heroicon name: solid/chevron-down -->
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
  <div 
  v-if="menuActive"
   
  class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
     
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <div
        v-for="option in optionList"
        :key="option.name"
       @mousedown="onChange( option.name, hide); "
      class="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-neutral-500" 
      role="menuitem" 
      tabindex="-1" id="menu-item-0">{{option.label}}
      </div>
     
     
      
    </div>
  </div>
</div>




</template> 


<script>
 
 //const tokenlist = require('../../../../shared/tokenlist.json')
 //import Web3Plug from '@/js/web3-plug.js' 

export default {
  name: 'GenericDropdown',
  props: [ 'optionList' , 'onSelectCallback' ],
  components: { },
  data() {
    return {
     menuActive:false,
     autoTrigger:false,
      
      selectedOptionData: {} 
    }
  },
  watch: {
    optionList: function (optionList) {
      console.log('watch optionList',this.optionList)
        if(this.optionList && this.optionList.length > 0){
           
           if( !this.selectedOptionData  || !this.selectedOptionData.label ){
             
             if(this.autoTrigger){
               this.handleSelectedOptionChanged( this.optionList[0] )
             }
               
           }
           
      }
    } 
  },


  created(){
      if(this.optionList && this.optionList.length > 0 && this.autoTrigger){
          this.handleSelectedOptionChanged( this.optionList[0] )
          
      }
       
  },
  mounted(){

        if(this.optionList && this.optionList.length > 0 && this.autoTrigger){ 

          this.handleSelectedOptionChanged( this.optionList[0] )
      }

      
  },
  methods: {
    onChange(optionName, hideMethod) {        
        
         hideMethod() 

        this.selectOptionByName(optionName)
    },
    selectOptionByName(optionName){
      console.log('sel 1', optionName)
       for(let optionData of this.optionList){
        if(optionData.name.toLowerCase() == (optionName.toLowerCase())){

             console.log('sel 2', optionData)

          this.handleSelectedOptionChanged(optionData)
          return
        }
      } 
    },
    handleSelectedOptionChanged(optionData){

      if(optionData && optionData.label){
        this.selectedOptionData = optionData
        console.log('selected option changed', optionData)
        if(optionData){
          this.onSelectCallback(optionData)
        }
      }
      
      
    },
    toggleMenu(){
      this.menuActive = !this.menuActive
    },
    hide(){
      this.menuActive = false
    }


  }
}
</script>
