import { render, screen } from '@testing-library/vue'
import Login from '@/views/Login.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      redirect: '',
      component: defineComponent({ template: `<div></div>` }),
      name: 'Login',
      children: []
    }
  ]
})
const renderLogin = () =>
  render(Login, {
    global: { plugins: [createTestingPinia(), router] }
  })

describe('Login', () => {
  it('should redner Login', () => {
    renderLogin()
    screen.getByLabelText('Email')
  })
})
