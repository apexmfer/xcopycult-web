<template>
    <div class="flex flex-col py-4 truncate  " style="word-wrap: break-word;white-space: pre-wrap;word-break: break-word;">

      <div class="font-lg font-bold "> {{threadData.title}} </div>

      <div class="font-xs"> <CategoryBadge></CategoryBadge> {{threadData.parentCategoryName}} </div>

    </div>
</template>

<script>

import CategoryBadge from '@/views/elements/CategoryBadge.vue'

export default {
  name: 'ThreadBanner',
  props:['threadData'],
  components:{
    CategoryBadge
    },
   data() {
    return {
      
    }
  },
  methods: {
  }

}
</script>
