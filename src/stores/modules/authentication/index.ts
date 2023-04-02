import AuthenticationService from '@/services/AuthenticationService'
import type { AuthenticationState, UserParams } from './types'
import { defineStore } from 'pinia'

export const useAuthentication = defineStore('authentication', {
  state: (): AuthenticationState => ({
    user: null,
    isUserLogged: false
  }),
  getters: {
    userDisplayName({ user }) {
      return user?.displayName
    }
  },
  actions: {
    toggleAuth() {
      this.isUserLogged = !this.isUserLogged
    },
    async login(user: UserParams): Promise<void> {
      await AuthenticationService.login(user)
      this.verifyIfIsLogged()
    },
    async register(user: UserParams) {
      await AuthenticationService.register(user)
    },
    async update(user: Omit<UserParams, 'password'>) {
      await AuthenticationService.update(user)
      const userUpdated = AuthenticationService.getCurrentUser()
      this.user = userUpdated
    },
    getcurrentUser() {
      return AuthenticationService.getCurrentUser()
    },
    verifyIfIsLogged() {
      const user = AuthenticationService.getCurrentUser()
      if (user) {
        this.toggleAuth()
        this.user = user
      }
    },
    async logout() {
      AuthenticationService.logout()
      this.toggleAuth()
    }
  }
})
