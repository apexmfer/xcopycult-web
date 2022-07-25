<template>
   
  <DashboardPage 
    mainTitle="My Shops"
    @web3AccountChanged="loadShops"
   > 
  

   
    <div>
        
        <GenericTable

        :topologyArray="[{label:'',value:'name'}]"
        :dataArray="shopsList"
        @clicked="onClickedShop"
        
        > </GenericTable> 


    </div> 


    <InfoPane
     class="my-16"
     >
         
         <div> Define a new digital shop including a name, brand logo, and description in order to start selling.  </div> 


         <ButtonDefault class="mt-4" @clicked="routeTo($router,{name:'dashboardshopnew'})">  Create a New Shop  </ButtonDefault>
    </InfoPane> 

 


   </DashboardPage>


</template>


<script>

import AppHelper, {routeTo,getWeb3StorageData} from '@/js/app-helper'
 

 
import DashboardPage from '../DashboardPage.vue';
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import FrontendHelper from '@/js/frontend-helper';

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'

 
 
export default {
  name: "ShopIndex",
  props: [],
  components: {DashboardPage,GenericTable,InfoPane,ButtonDefault},
  data() {
    return {
        shopsList: [] 
    };
  },
 
  created() { 
 
  },
  async mounted () {

      this.loadShops()
  },
  methods: {
     
    routeTo,getWeb3StorageData,


    async loadShops(){

      let authToken = FrontendHelper.getAuthToken()

      let web3StorageData = this.getWeb3StorageData(this.$store)

      let publicAddress = web3StorageData.account
      

      console.log('account', publicAddress)

      let response = await resolveRoutedApiQuery('getShops', {adminAddress:publicAddress, authToken,publicAddress})

      let myShopsList = response.data
        
      console.log('myShopsList', myShopsList)


      this.shopsList = []

      if(myShopsList){

         myShopsList.map( x => this.shopsList.push(  x  ))
      }


    

      console.log('shopsList',this.shopsList)


    },

    onClickedShop(row){ 

      let shopId = row.shopId

      if(!shopId){
        console.error('no shop id')
        return
      }

      this.routeTo(this.$router, {name: 'managementshopshow', params: {shopId}} )

    }
  },
};
</script>
