<template>
   
   <ProfilePage 
    mainTitle="My Orders"
    @web3AccountChanged="loadOrders"
   > 
    

    <div>
        
        <GenericTable

        :topologyArray="[ {label:'orderId', value:'orderId'} , {label:'status', value:'status'} ]"
        :dataArray="ordersList"
        @clicked="onClickedOrder"
        
        > </GenericTable> 


    </div> 

 
     

   </ProfilePage>


</template>


<script>

import AppHelper, {routeTo, getWeb3StorageData} from '@/js/app-helper'
 

 
import ProfilePage from '../ProfilePage.vue';
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'
import FrontendHelper from '@/js/frontend-helper';

import GenericTable from '@/views/elements/generictable.vue'
import InfoPane from '@/views/elements/infopane.vue'
import ButtonDefault from '@/views/elements/button_default.vue'
 
 
export default {
  name: "ManagementShopIndex",
  props: [],
  components: {ProfilePage,GenericTable,InfoPane,ButtonDefault},
  data() {
    return {
        ordersList: []  
    };
  },
 

  created() {


    
 
  },
  async mounted () {

      this.loadOrders()
  },
  methods: {
     
    routeTo,
    
    getWeb3StorageData,


    async loadOrders(){

      let authToken = FrontendHelper.getAuthToken()

      let web3StorageData = this.getWeb3StorageData(this.$store)

        
      let publicAddress = web3StorageData.account
      

      console.log('account', this.activeAccount)

      let response = await resolveRoutedApiQuery('getOrders', {buyerAddress: publicAddress, authToken,publicAddress})

      let myOrdersList = response.data
        
      console.log('myOrdersList', myOrdersList)


      this.ordersList = []
   
      if(myOrdersList){

        myOrdersList.map(x => this.ordersList.push( x )) 
        
      }

      console.log('ordersList',this.ordersList)


    },

    onClickedOrder(row){ 

      let orderId = row.orderId

      if(!orderId){
        console.error('no order id')
        return
      }

      this.routeTo(this.$router,{name: 'ordershow', params: {orderId}} )

    }
  },
};
</script>
