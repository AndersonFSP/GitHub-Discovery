import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import Login from '@/views/Login.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'
import { useAuthentication } from '@/stores/modules/authentication'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: defineComponent({ template: `<div></div>` }),
      name: 'Login'
    },
    {
      path: '/discovery',
      component: defineComponent({ template: `<div></div>` }),
      name: 'discovery',
    },
    {
      path: '/register',
      component: defineComponent({ template: `<div></div>` }),
      name: 'register',
    }
  ]
})
const renderLogin = () =>
  render(Login, {
    global: { plugins: [createTestingPinia(), router] }
  })

describe('Login', () => {
  it('should render Login', () => {
    renderLogin()
    screen.getByText('Login')
    screen.getByLabelText('Email')
    screen.getByLabelText('Password')
    screen.getByText('sign in')
    screen.getByText(`Don't have an account?`)
    screen.getByText('Click here to sign up')
  })

  it('should not submit the form if it is not fill out', async () => {
    renderLogin()
    const submitButton = screen.getByText('sign in')
    await fireEvent.click(submitButton)
    const store = useAuthentication()

    await waitFor(() => {
      screen.getByText('email is not valid')
      screen.getByText('password is not valid')
    })
    expect(store.login).not.toBeCalled()
  })

  it('should submit the form if it is fill out and redirect to discovery page', async () => {
    renderLogin()
    const store = useAuthentication()
    const form = { email: 'test@out.com', password: '12234567897554'}
    const inputEmail = screen.getByLabelText('Email')
    await fireEvent.update(inputEmail, form.email)
    const inputPassword = screen.getByLabelText('Password')
    await fireEvent.update(inputPassword, form.password)
    const submitButton = screen.getByText('sign in')
    await fireEvent.click(submitButton)

    await waitFor(() => {
      expect(store.login).toBeCalledWith(form)
      expect(router.currentRoute.value.name).toEqual('discovery')
    })
  })

  it('should not redirect to discovery page if an error occurs on login', async () => {
    renderLogin()
    const store = useAuthentication()
    vi.spyOn(store, 'login').mockRejectedValueOnce({})

    const form = { email: 'test@out.com', password: '12234567897554'}
    const inputEmail = screen.getByLabelText('Email')
    await fireEvent.update(inputEmail, form.email)
    const inputPassword = screen.getByLabelText('Password')
    await fireEvent.update(inputPassword, form.password)
    const submitButton = screen.getByText('sign in')
    await fireEvent.click(submitButton)

    await waitFor(() => {
      expect(store.login).not.toBeCalledWith(form)
      expect(router.currentRoute.value.name).not.toEqual('discovery')
    })
  })

  it('should redirect to register route when click the link', async () => {
    renderLogin()
    const linkToRegister = screen.getByText('Click here to sign up')
    await fireEvent.click(linkToRegister)
    await waitFor(() => {
      expect(router.currentRoute.value.name).toEqual('register')
    })
  })
})
