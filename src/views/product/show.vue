<template>
  <div>
   <ShopfrontLayout> 


     <div class=" ">
     

        <div class="grid grid-cols-4 gap-1 text-white">

             <div class=" col-span-3 bg-neutral-200" style="min-height:600px">
               
            <div class="p-4  text-neutral-800 ">

                   <MultiImageGallery 
                      :imageDataArray="getProductImages()"
                    />

            </div>


            <div class="  p-4   text-neutral-800 hidden ">


                     <div v-if="productData" class="my-8 font-sharp text-xl"> {{productData.name}} </div> 
                     <div v-if="productData" class="my-8">   {{ productData.description }} </div> 


            </div>

                

         

          </div>


  
          <div class="col-span-1  border-2 border-neutral-400 rounded bg-neutral-100 text-black" style="min-height:600px">
          
            <div class="bg-neutral-800 text-white font-sharp text-2xl p-2 mb-2">
              
              <div v-if="productData"> {{productData.name}} </div>

             
            </div>


               <div v-if="productData" class="m-4 text-neutral-700"> {{getDescription()}} </div>


              <div> 
                

                <div class="p-2 bg-neutral-800 text-white m-2"> Select Style  </div> 

                  <div class="p-2 m-2 border-neutral-600" v-if="productData">
                    <div 
                    v-for="(purchaseable) in productData.purchaseables" 
                    :key="purchaseable.purchaseableId"
                    class="border-2  p-2 m-2 inline-block select-none cursor-pointer hover:bg-neutral-200"
                    :class="{'border-purple-500': selectedPurchaseable && purchaseable.purchaseableId == selectedPurchaseable.purchaseableId  }"
                    @click="selectPurchaseable(purchaseable)"
                    > 
 
                      {{ purchaseable.variantLabel }}
                    </div> 
                  </div>

                  <div v-if="selectedPurchaseable" class="my-4 p-2">

                    
                    <div class="capitalize">Style: {{selectedPurchaseable.variantName}}  ({{selectedPurchaseable.variantLabel}}) </div>
                    <div class="capitalize">Price (USD): ${{selectedPurchaseable.priceUsd}}    </div>    
                    
                  </div>

                 </div>   
 

              <div class="mx-2 my-1"> 
                <ButtonDefault customClass=""  v-if="web3IsActive()" @clicked="addToCart" :disabled="selectedPurchaseable == undefined"> Add to Cart  </ButtonDefault>
              
                   <ButtonDefault v-if="!web3IsActive()" :customClass="'bg-neutral-500 border-2 border-neutral-600 hover:bg-neutral-400'"  @clicked="showWeb3Modal"> Login  </ButtonDefault>
            
                  <div>
            
          </div>
              </div>

              <div class="mx-2 my-1 hidden"> 
                <ButtonDefault customClass=""  @clicked="buyNow"> Buy Now  </ButtonDefault>
              </div>

          </div>
         
        </div>


    </div> 



   
   </ShopfrontLayout>
  </div>
</template>


<script>
 

 
import ShopfrontLayout from '@/views/ShopfrontLayout.vue';
import ButtonDefault from '@/views/elements/button_default.vue'

import MultiImageGallery from '@/views/elements/MultiImageGallery.vue'

import AppHelper, {routeTo} from '@/js/app-helper'
 
import {resolveRoutedApiQuery} from '@/js/rest-api-helper.ts'

export default {
  name: "ProductShow",
  props: [],
  components: { 
    ShopfrontLayout, 
    ButtonDefault,
    MultiImageGallery },

  


  data() {
    return {
        productData: undefined,
        quantity:1,
        selectedPurchaseable: undefined 
    };
  },

  async mounted() {
 

    await this.fetchProductData() 

    this.selectDefaultPurchaseable()
  

    console.log('loaded  product id', this.productId)
     
  },

  methods: {
   
    routeTo,
   
    buyNow( ){
       


    },


    addToCart(){
         // let productId  = this.productData.productId

          let purchaseable = this.selectedPurchaseable  //integrate me !!

          if(!purchaseable){
            console.error('Select a purchaseable first')
          }

          this.$store.dispatch('addCartItem',{
            purchaseableId:purchaseable.purchaseableId,
            quantity:this.quantity})

          this.$store.commit('setShowCartPreview',true)

      },
    

      showWeb3Modal(){
        this.$store.commit('setShowWeb3ConnectModal',true)
      },
  


    async fetchProductData(){

      let productId = this.$route.params.productId

      let response = await resolveRoutedApiQuery('getProduct', {productId} )

      if(!response.success){
        console.error('could not load product data ') 
      }

      this.productData = response.data
    },

      web3IsActive(){          
        return this.$store.state.web3Storage.active
      },


    getProductImages(){

      if(!this.productData) return [] 

      return this.productData.images
    },

    getDescription(){

      return (this.productData && this.productData.description) ? this.productData.description : 'No description.'

    },

    selectDefaultPurchaseable(){
      if(this.productData && this.productData.purchaseables && this.productData.purchaseables.length > 0){
        this.selectPurchaseable(this.productData.purchaseables[0])
      }
    },

    selectPurchaseable(item){

      
      this.selectedPurchaseable = item
    }

     

  }
  }

</script>
