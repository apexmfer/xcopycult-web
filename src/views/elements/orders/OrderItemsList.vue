 

<template>
    
    <div class=""> 
         
            <CartItemRow 
            v-for="item of itemsData" 
            :key="item.itemId" 
            :cartItemData="item" 
            customClass="px-2 py-2 my-2"
            /> 
                 
    </div>

</template>




<script>
 
import CartItemRow from './CartItemRow.vue'


export default {
  name: "OrderItemsList",
  props: [ 'itemsData' ],
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
