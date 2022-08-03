import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'


import Dashboard from './views/dashboard/Dashboard.vue'
 
import Profile from './views/profile/Profile.vue'
 
import Map from './views/Map.vue'

import ProfileOrderIndex from './views/profile/order/index.vue'

 
import ThreadShow from './views/thread/show.vue'
import ThreadNew from './views/thread/new.vue'

import CategoriesIndex from './views/categories/index.vue'
import CategoriesShow from './views/categories/show.vue'

 


/*
import Cart from './views/orders/cart.vue'

 
import OrderShow from './views/orders/show.vue'




import ShopShow from './views/shop/show.vue'
import ProductShow from './views/product/show.vue'
*/

import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({  
  mode: 'history',
  base: process.env.PUBLIC_URL,
  routes: [


   
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },



    {
      path: '/map',
      name: 'map',
      component: Map
    },

    


    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    
    {
      path: '/categories',
      name: 'categoriesindex',
      component:CategoriesIndex
    },

    {
      path: '/category/:slug',
      name: 'categoryshow',
      component:CategoriesShow
    },


    {
      path: '/thread/new',
      name: 'threadnew',
      component:ThreadNew
    },

    
    {
      path: '/thread/:threadId',
      name: 'threadshow',
      component:ThreadShow
    },
    
      
      

    {
      path: '/*',
      component: NotFound
    },
    
 

  ]
})
