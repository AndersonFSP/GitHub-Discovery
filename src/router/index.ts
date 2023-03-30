import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import AuthenticationService from '@/services/AuthenticationService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta?.requiresAuth ? true : false
  if (!AuthenticationService.getCurrentUser() && requiresAuth) next({ name: 'login' })
  else next()
})

export default router
