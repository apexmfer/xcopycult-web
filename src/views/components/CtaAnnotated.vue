<template> 
   

 
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
            UFO Online Database <br />
           
            

          </CHeading>
          <CText color='gray.500'>
              
              
              Un-biased and unopinionated scientific database for any and all reports of Unidentifiable Flying Objects (UFOs) and Unidentifiable Aerial Phenomena (UAPs).  All reports and encounters may or may not be trustworthy so any and all supportive evidence is encouraged.    
         
          </CText>
          <CStack
            direction='column'
            spacing=3
            align='center'
            alignSelf='center'
            position='relative'>
            <CButton
              colorScheme='green'
              bg='green.400'
              rounded='full'
              px=6
              
              >
              Get Started
            </CButton>
            <CButton variant='link' colorScheme='blue' size='sm' @click="routeTo($router,{name:'categoriesindex'})">
             Browse All 
            </CButton>
             <CButton variant='link' colorScheme='blue' size='sm' @click="routeTo($router,{name:'recentactivity'})" >
              Recent Activity
            </CButton>
             <CButton variant='link' colorScheme='blue' size='sm' @click="routeTo($router,{name:'threadnew'})" >
              Add a Report
            </CButton>
             
          </CStack>
        </CStack>
     
    </CFlex>
    </template>

<script>


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
 
    

import AppHelper, {routeTo} from '@/js/app-helper'
 
export default {
  name: "CtaAnnotated",
  props: [],
  components: { 
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
  methods: {

     routeTo,
  }
}

 </script>
    

