<template>
 <ProfileLayout > 

    <div  class="pb-16"> 

     <div  v-if="mainTitle" class=" font-sharp text-2xl mb-8 "> {{ mainTitle }} </div>


    <slot v-if="activeAccount"> </slot> 



    <InfoPane 
    class="mt-16"
    v-if="!activeAccount ">

        Please connect a web3 account.

    </InfoPane> 

    </div>

   </ProfileLayout>
</template>


<script>
 

import AppHelper, {routeTo,getWeb3StorageData } from '@/js/app-helper'
 

 
import ProfileLayout from './ProfileLayout.vue';
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import FrontendHelper from '@/js/frontend-helper';
 
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'

 
 

export default {
  name: "ProfilePage",
  props: ['mainTitle'],
  components: {ProfileLayout, InfoPane },

  


  data() {
    return {
        activeAccount: undefined 
    };
  },

    watch: {
    '$store.state.web3Storage.account' (newAccount) { 
      this.activeAccount = newAccount;     
      console.log('new acct', newAccount)
      this.$emit( 'web3AccountChanged' , newAccount)     
    }
  },

  mounted() {
    let web3StorageData = this.getWeb3StorageData(this.$store)

    this.activeAccount = web3StorageData.account
  },

  methods: {
   
    routeTo,

    getWeb3StorageData,
    

    
  },
};
</script>
