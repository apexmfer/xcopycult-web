<<template>

<div>
  <div>
    <div class="section bg-gray-200 border-b-4 border-black px-0 lg:px-1">
      <div class=" ">
        <Navbar ref="navbar"  />
      </div>
    </div>


    <slot></slot>


      <Footer />
    </div>

   

     <AccountSidenav   />  
 

  </div>
   
</template>

<script>
 





import Navbar from "./components/nav/Navbar.vue";

import Footer from "./components/Footer.vue";
 
import AccountSidenav from '@/views/components/nav/AccountSidenav.vue'
import Web3ConnectModal from '@/views/components/web3connectmodal.vue'
import CartPreview from '@/views/components/CartPreview.vue'
 

import getRouteTo from "@/js/frontend-helper"

export default {
  name: 'PrimaryLayout',
  props: [],
  components: {
    Navbar, 
    Footer,
    AccountSidenav,
    Web3ConnectModal,
    CartPreview
    },
  data() {
    return {
       

    }
  },
  created() {
 
  },
  mounted() {

 
 
  },
  methods: {


    getRouteTo 
   


  }
}
</script>
