 

<template>
    
    <div class=""> 
         
            <CartItemRow 
            v-for="item of cartItemsData" 
            :key="item.itemId" 
            :cartItemData="item" 
            customClass="px-2 py-2 my-2"
            /> 
                 
    </div>

</template>




<script>
 
import CartItemRow from './CartItemRow.vue'


export default {
  name: "CartItemsList",
  props: [ 'cartItemsData' ],
  components: { CartItemRow  },
  data() {
    return {
        
    };
  },

  created() {
     
  },

  methods: {
       
 
 
    
  },
};
</script>
