<<template>

<PrimaryLayout>

  <div class="w-container my-16">

    
        <slot></slot>

    </div>

</PrimaryLayout>
   
</template>

<script>
 





import PrimaryLayout from "../PrimaryLayout.vue";
 import CategoriesNavbar from "@/views/components/categories/CategoriesNavbar.vue"

import getRouteTo from "@/js/frontend-helper"

export default {
  name: 'ForumLayout',
  props: [],
  components: { 
    PrimaryLayout,
    CategoriesNavbar
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
