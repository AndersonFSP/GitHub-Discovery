import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import AuthenticationService from '@/services/AuthenticationService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta?.requiresAuth ? true : false
  document.title = `GitHub Discovery | ${to.meta.title}`
  const isUserlogged = AuthenticationService.getCurrentUser()
  if (isUserlogged && to.name === 'login') next({ name: 'discovery' })
  else if (!isUserlogged && requiresAuth) next({ name: 'login' })
  else next()
})

export default router
