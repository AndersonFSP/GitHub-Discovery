import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import UpdateUser from '@/views/UpdateUser.vue'
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
      name: 'discovery',
    },
    {
      path: '/register',
      component: defineComponent({ template: `<div></div>` }),
      name: 'register',
    }
  ]
})
const user = { displayName: 'Anderson', email: 'test@out.com'}
const renderUpdateUser = () =>
  render(UpdateUser, {
    global: { plugins: [createTestingPinia({ initialState: { authentication: { user } } }), router] }
  })

describe('Login', () => {
  it('should render UpdateUser', () => {
    renderUpdateUser()
    screen.getByText('My Account')
    screen.getByLabelText('Email')
    screen.getByLabelText('Username')
    screen.getByText('save')
  })

  it('should inputs have value', async () => {
    renderUpdateUser()
    const inputUsername = screen.getByLabelText('Username')
    expect(inputUsername).toHaveValue(user.displayName)
    const inputEmail = screen.getByLabelText('Email')
    expect(inputEmail).toHaveValue(user.email)
  })


  it('should submit the form if it is fill out', async () => {
    renderUpdateUser()
    const store = useAuthentication()
    const inputUsername = screen.getByLabelText('Email')
    await fireEvent.update(inputUsername, '')

    const submitButton = screen.getByText('save')
    await fireEvent.click(submitButton)
  
    await waitFor(() => {
      expect(store.update).not.toBeCalled()
      
    })
  })

  it('should submit the form if it is fill', async () => {
    renderUpdateUser()
    const store = useAuthentication()
    const form = { displayName: 'new Email', email: 'new@email.com' }
    const inputUsername = screen.getByLabelText('Username')
    await fireEvent.update(inputUsername, form.displayName)
    const inputEmail = screen.getByLabelText('Email')
    await fireEvent.update(inputEmail, form.email)
    const submitButton = screen.getByText('save')
    await fireEvent.click(submitButton)
  
    await waitFor(() => {
      expect(store.update).toBeCalledWith(form)
      expect(router.currentRoute.value.name).toEqual('login')
    })
  })
})
