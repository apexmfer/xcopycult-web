import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
 

import Dashboard from './views/dashboard/Dashboard.vue'
 
 
import Gallery from './views/Gallery.vue'
  
import About from './views/About.vue'

import DigitalAssetsNew from './views/digitalassets/new.vue'
import DigitalAssetsShow from './views/digitalassets/show.vue'

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
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },


    {
      path: '/',
      name: 'about',
      component: About
    },


    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },



    {
      path: '/digitalassets/new',
      name: 'digitalassetsnew',
      component: DigitalAssetsNew
    },
     
    {
      path: '/digitalassets/:id',
      name: 'digitalassetshow',
      component: DigitalAssetsShow
    },
 
      

    {
      path: '/*',
      component: NotFound
    },
    
 

  ]
})
