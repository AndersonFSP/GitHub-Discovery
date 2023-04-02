import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import Header from './Header.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'
import { useAuthentication } from '@/stores/modules/authentication'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/update-user',
      component: defineComponent({ template: `<div></div>` }),
      name: 'User'
    },
    {
      path: '/login',
      component: defineComponent({ template: `<div></div>` }),
      name: 'login'
    },
    {
      path: '/discovery',
      component: defineComponent({ template: `<div></div>` }),
      name: 'Discovery'
    }
  ]
})
const user = { displayName: 'Anderson Filipe' }
const renderHeader = () =>
  render(Header, {
    global: {
      plugins: [createTestingPinia({ initialState: { authentication: { user } } }), router]
    }
  })

describe('Header', () => {
  it('should render Header', () => {
    renderHeader()
    screen.getByText('Discovery')
    screen.getByText(user.displayName)
    screen.getByText('Logout')
  })

  it('should go to update user route', async () => {
    renderHeader()
    const userNameLink = screen.getByText(user.displayName)
    await fireEvent.click(userNameLink)
    await waitFor(() => {
      expect(router.currentRoute.value.name).toBe('User')
    })
  })

  it('should go to discovery route', async () => {
    renderHeader()
    const discoveryLink = screen.getByText('Discovery')
    await fireEvent.click(discoveryLink)
    await waitFor(() => {
      expect(router.currentRoute.value.name).toBe('Discovery')
    })
  })

  it('should logout', async () => {
    renderHeader()
    const store = useAuthentication()
    const logoutLink = screen.getByText('Logout')
    await fireEvent.click(logoutLink)
    await waitFor(() => {
      expect(store.logout).toHaveBeenCalled()
      expect(router.currentRoute.value.name).toBe('login')
    })
  })
})
