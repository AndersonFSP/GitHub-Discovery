import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Discovery from '@/views/Discovery.vue'
import UpdateUser from '@/views/UpdateUser.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      requiresAuth: true,
      header: true,
      title: 'Home'
    }
  },
  {
    path: '/update-user',
    name: 'update',
    component: UpdateUser,
    meta: {
      requiresAuth: true,
      header: true,
      title: 'My Account'
    }
  },
  { path:  '/:catchAll(.*)', redirect: '/' }, 
]
