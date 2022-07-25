import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'


import Dashboard from './views/dashboard/Dashboard.vue'
 
import Profile from './views/profile/Profile.vue'

import ProfileOrderIndex from './views/profile/order/index.vue'


import DashboardShopIndex from './views/dashboard/shop/index.vue'
import DashboardShopNew from './views/dashboard/shop/new.vue'


import DashboardEndpointIndex from './views/dashboard/endpoint/index.vue'
import DashboardEndpointNew from './views/dashboard/endpoint/new.vue'
import DashboardEndpointShow from './views/dashboard/endpoint/show.vue'

import DashboardSlugIndex from './views/dashboard/slug/index.vue'

import SlugShow from './views/slug/show.vue'


/*
import ManagementShopShow from './views/management/shop/show.vue'

import ManagementShopEdit from './views/management/shop/edit.vue'


import ManagementProductShow from './views/management/product/show.vue'
import ManagementProductNew from './views/management/product/new.vue'
import ManagementProductEdit from './views/management/product/show.vue'



import ManagementProductAttributeNew from './views/management/productattribute/new.vue'
import ManagementProductAttributeEdit from './views/management/productattribute/edit.vue'

import ManagementPurchaseableNew from './views/management/purchaseable/new.vue'
import ManagementPurchaseableEdit from './views/management/purchaseable/edit.vue'

import ManagementProductIndex from './views/management/product/index.vue'

import ManagementOrderIndex from './views/management/order/index.vue'

import ManagementImageIndex from './views/management/image/index.vue'
*/


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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    
    {
      path: '/dashboard/endpoints',
      name: 'dashboardendpointindex',
      component: DashboardEndpointIndex
    },
    {
      path: '/dashboard/slugs',
      name: 'dashboardslugindex',
      component: DashboardSlugIndex
    },


    {
      path: '/dashboard/endpoint/new',
      name: 'dashboardendpointnew',
      component: DashboardEndpointNew
    },


    {
      path: '/dashboard/endpoint/:endpointId',
      name: 'dashboardendpointshow',
      component: DashboardEndpointShow
    },


    {
      path: '/slug/:slugId',
      name: 'slugshow',
      component: SlugShow
    },

    {
      path: '/*',
      component: NotFound
    },
    
 

  ]
})
