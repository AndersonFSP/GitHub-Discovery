import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import Register from '@/views/Register.vue'
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
      name: 'login'
    },
    {
      path: '/discovery',
      component: defineComponent({ template: `<div></div>` }),
      name: 'discovery'
    },
    {
      path: '/register',
      component: defineComponent({ template: `<div></div>` }),
      name: 'register'
    }
  ]
})
const form = { displayName: 'Anderson', email: 'test@out.com', password: '12234567897554' }
const renderRegister = () =>
  render(Register, {
    global: { plugins: [createTestingPinia(), router] }
  })

describe('Register', () => {
  it('should render Register', () => {
    renderRegister()
    screen.getByText('Register')
    screen.getByLabelText('Email')
    screen.getByLabelText('Password')
    screen.getByLabelText('Username')
    screen.getByText('Create')
  })

  it('should not submit the form if it is not fill out', async () => {
    renderRegister()
    const submitButton = screen.getByText('Create')
    await fireEvent.click(submitButton)
    const store = useAuthentication()

    await waitFor(() => {
      screen.getByText('username is not valid')
      screen.getByText('email is not valid')
      screen.getByText('password should have at least 6 characters')
    })
    expect(store.register).not.toBeCalled()
  })

  it('should submit the form if it is fill out and redirect to login page', async () => {
    renderRegister()
    const store = useAuthentication()
    const inputName = screen.getByLabelText('Username')
    await fireEvent.update(inputName, form.displayName)
    const inputEmail = screen.getByLabelText('Email')
    await fireEvent.update(inputEmail, form.email)
    const inputPassword = screen.getByLabelText('Password')
    await fireEvent.update(inputPassword, form.password)
    const submitButton = screen.getByText('Create')
    await fireEvent.click(submitButton)

    await waitFor(() => {
      expect(store.register).toBeCalledWith(form)
      expect(router.currentRoute.value.name).toEqual('login')
    })
  })

  it('should not redirect to discovery page if an error occurs on register', async () => {
    renderRegister()
    const store = useAuthentication()
    vi.spyOn(store, 'register').mockRejectedValueOnce({})

    const inputEmail = screen.getByLabelText('Email')
    await fireEvent.update(inputEmail, form.email)
    const inputPassword = screen.getByLabelText('Password')
    await fireEvent.update(inputPassword, form.password)
    const submitButton = screen.getByText('Create')
    await fireEvent.click(submitButton)

    await waitFor(() => {
      expect(store.login).not.toBeCalledWith(form)
      expect(router.currentRoute.value.name).not.toEqual('login')
    })
  })
})
