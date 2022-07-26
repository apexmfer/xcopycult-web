import Vue from 'vue'

import Vuex from 'vuex'

//@ts-ignore
import web3Storage from "vuex-web3-plugin";

import shoppingCart from "@/store/modules/shoppingCart";
import frontendStorage from '@/store/modules/frontEnd'

//import VueTailwind from 'vue-tailwind'
import App from './App.vue'
import router from './router'
//import Vuelidate from 'vuelidate'


//import "tailwindcss/tailwind.css"

import './css/github-markdown.css'

import './css/tailwind.css'
import './css/main.css'
import './css/normalize.css'
import './css/transitions.css'
import Chakra, { CThemeProvider } from '@chakra-ui/vue'

Vue.use(Chakra) 


Vue.config.productionTip = false


//Vue.use(Vuelidate, VueTailwind, settings)
Vue.config.productionTip = false;

//@ts-ignore
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    web3Storage,
    shoppingCart,
    frontendStorage

      // prediction: predictionStore,
      // user: userStore
  }


})

const initializeVuexStorage = (s:any) =>{
  
  s.commit('initCart');
  s.commit('initWeb3Storage');


}
 
new Vue({
  router,
  store,
  beforeCreate() { initializeVuexStorage(store) },
  render: h =>  h(CThemeProvider, [h(App)])
}).$mount('#app')

