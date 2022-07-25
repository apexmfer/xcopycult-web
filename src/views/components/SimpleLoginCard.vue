

<template>

 
    
    <CFlex
      minH='100vh'
      align='center'
      justify='center'
      
      >
     

      <CStack  :spacing=8 mx='auto' maxW='lg' py=12 px=6>
        <CStack align='center'>
          <CHeading fontSize='4xl'>Sign in to RQR Codes</CHeading>
          <CText fontSize='lg' color='gray.600'>
            to start building <CLink color='blue.400'>QR Codes</CLink> ✌️
          </CText>
        </CStack>
        <CBox
          rounded='lg' 
          boxShadow='lg'
          p=8
            bg="gray.400">

          <CStack spacing=4>
             
            <CStack spacing=10>
              
              <CButton
                size="md"
                height="50px"
                 
                border="2px" 
                border-color="gray.500"

                variant-color="blue"
                variant="outline"
                color='white'
                :_hover="{
                  bg: 'blue.500',
                }"

                @click="redirectTo('@api/auth/google')"
                >
                Sign in with Google
              </CButton>
            </CStack>
          </CStack>
        </CBox>
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
  CCheckbox,
  CStack,
  CLink,
  CButton,
  CHeading,
  CText 
} from '@chakra-ui/vue';


import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
 

export default {
  name: "SimpleLoginCard",
  props: [],
  components: { 
  CFlex,
  CBox,
  CFormControl,
  CFormLabel,
  CInput,
  CCheckbox,
  CStack,
  CLink,
  CButton,
  CHeading,
  CText 
  },
  methods: {

     routeTo,redirectTo
  }
}
 
 </script>