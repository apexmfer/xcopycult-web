<template>
  <div class=" ">

    <div v-if="title" class="font-sharp text-lg mb-2"> {{title }} </div>

     <table class="table-auto w-full" v-if="dataArray && dataArray.length > 0">
          <thead>
            <tr>
              <th style="text-align:left" v-for="(topology, index) in topologyArray">{{topology.label}}</th>
               
            </tr>
          </thead>
          <tbody v-cloak>
            <tr v-for="row of dataArray" class="hover:bg-gray-700 cursor-pointer  py-4 rainbow-hover " @click="clickedRow(row)">
               
              <td v-for="(topology, index) in topologyArray"  class="py-2 px-2 my-2 truncate" >{{ row[topology.value] }}</td>
              
            </tr>
             
          </tbody>
        </table>

        <div v-if="!dataArray || dataArray.length == 0" v-cloak>
          No records found.
        </div>
  </div>
</template>


<script>
export default {
  name: 'GenericTable',
  props: ['title','topologyArray','dataArray'],
  data() {
    return {
    }
  },
  created(){
  },
  methods: {
      clickedRow(row){
        this.$emit('clicked',row)
      }
  }
}
</script>