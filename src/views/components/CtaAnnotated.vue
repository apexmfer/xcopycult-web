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
            :fontSize= "{base: '2xl', sm: '4xl', md: '6xl' }"
            lineHeight='110%'
            color='black'>
            Dynamic QR Codes <br />
            <CText as='span' color='blue.200'>
              made simple
            </CText>
          </CHeading>
          <CText color='gray.500'>
              Supercharge marketing your brand with QR codes that link to your hottest content.  Print them physically on business cards, posters, or stickers.  If you ever need to update the URL, its made simple with our <b>endpoint routing technology</b>.
         
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
            <CButton variant='link' colorScheme='blue' size='sm'>
              Learn more
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
    

