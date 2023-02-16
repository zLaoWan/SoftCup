import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [

  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView')
  },
  { 
    path: '/one',
    name: 'one',
    component: () => import('../components/one')
  },
  { 
    path: '/two',
    name: 'two',
    component: () => import('../components/two')
  },
  { 
    path: '/twob',
    name: 'twob',
    component: () => import('../components/twob')
  },
  { 
    path: '/twoc',
    name: 'twoc',
    component: () => import('../components/twoc')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
