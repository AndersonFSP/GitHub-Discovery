vi.mock('@/services/AuthenticationService')

import { useAuthentication } from '@/stores/modules/authentication'
import { createPinia, setActivePinia } from 'pinia'
import AuthenticationService from '@/services/AuthenticationService'
import type { User } from 'firebase/auth'

const initialState = { user: null, isUserLogged: false }
const user = {
  email: 'email',
  password: 'pass',
  displayName: 'string'
}

describe('useAuthentication', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should have the correct initial state', () => {
    const { user, isUserLogged } = useAuthentication()
    expect({ user, isUserLogged }).toEqual(initialState)
  })

  it('should toggle Auth', () => {
    const store = useAuthentication()
    store.toggleAuth()
    expect(store.isUserLogged).toBeTruthy()
  })

  it('should call AuthenticationService.login with the correct parameters', () => {
    const store = useAuthentication()
    store.login(user)
    expect(AuthenticationService.login).toHaveBeenCalledWith(user)
  })

  it('should call AuthenticationService.update with the correct parameters', () => {
    const store = useAuthentication()
    store.update(user)
    expect(AuthenticationService.update).toHaveBeenCalledWith(user)
  })

  it('should call AuthenticationService.getCurrentUser', async () => {
    vi.spyOn(AuthenticationService, 'getCurrentUser').mockReturnValue({} as User)
    const store = useAuthentication()
    store.verifyIfIsLogged()
    expect(AuthenticationService.getCurrentUser).toHaveBeenCalled()
    expect(store.user).toEqual({})
  })

  it('should call AuthenticationService.logout', async () => {
    const store = useAuthentication()
    store.logout()
    expect(AuthenticationService.logout).toHaveBeenCalled()
  })
})
