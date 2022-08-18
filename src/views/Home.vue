<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-row"> 
    <div class=" w-1/2 text-white py-48 text-center">

       <img src="@/assets/images/thedoomed.gif" style="width:80%;"  class="centered p-4 border-neutral-500 border-2" /> 
 

  <div class="py-4 px-2 text-gray-700 hover:text-black cursor-pointer" @click="routeTo($router,{name:'gallery'})" >  See the full gallery   </div>

    </div>

     <div class=" w-1/2   text-white">

      <CFlex
      minH='100vh'
      align='center'
      justify='center'
      
      >
        <CStack
            maxW='lg'
          textAlign='center'
          :spacing= "{base: 8, md: 14 }"
          :py= "{base: 20, md: 36 }">
          <CHeading
            fontWeight=600
            :fontSize= "{base: 'xl', sm: '2xl', md: '4xl' }"
            lineHeight='110%'
            color='black'>
            {{assetMetadata.title}} 
            
            <br />
           
            

          </CHeading>
          <CText color='gray.500'>
              
              
             {{assetMetadata.description}}
         
          </CText>



          <CStack
            class="mt-16 hidden"
            direction='column'
            spacing=3
            align='center'
            alignSelf='center'
            position='relative'>
          
             <CButton variant='link' class="text-neutral-800" colorScheme='blue' size='sm' @click="routeTo($router,{name:'categoriesindex'})" >
              Recent Activity
            </CButton>
             <CButton variant='link' class="text-neutral-500" colorScheme='blue' size='sm' @click="routeTo($router,{name:'threadnew'})" >
              Add a Report
            </CButton>
             
          </CStack>
        </CStack>
     
    </CFlex>

     </div>

     </div>

 
     


   </PrimaryLayout>
  </div>
</template>


<script>
 
 import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
 
 
import PrimaryLayout from './PrimaryLayout.vue';
 import {
  CFlex,
  CBox,
  CFormControl,
  CFormLabel,
  CInput,
  CIcon,
  CCheckbox,
  CStack,
  CLink,
  CButton,
  CHeading,
  CHead,
  CText 
} from '@chakra-ui/vue';

export default {
  name: "Home",
  props: [],
  components: { 
    PrimaryLayout,  
    CFlex,
    CBox,
    CFormControl,
    CFormLabel, 
    CInput,
    CIcon,
    CCheckbox,
    CStack,
    CLink,
    CButton,
    CHeading,
    CHead,
    CText 
    },
  data() {
    return {
        assetMetadata: {}
    };
  },

  async created() {
     this.assetMetadata = await this.loadRandomAssetMetadata()
    
  },

  methods: {
    routeTo,

    getRouteTo(dest) {
      return FrontendHelper.getRouteTo(dest);
    },

   async loadRandomAssetMetadata(){

      return {

        imagePath:"",
        title: "The Doomed",
        description: "Tech won't save us."


      }

    }

    
  },
};
</script>
