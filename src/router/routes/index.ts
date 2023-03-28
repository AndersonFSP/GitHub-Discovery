import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Discovery from '@/views/Discovery.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      requiresAuth: true
    }
  }
]