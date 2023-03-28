import AuthenticationService from '@/services/AuthenticationService'
import type { AuthenticationState, UserParams } from './types'
import { defineStore } from 'pinia'
import type { User } from 'firebase/auth'

export const useAuthentication = defineStore('authentication', {
  state: (): AuthenticationState => ({
    user: null,
    isUserLogged: false,
  }),

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
      this.toggleAuth()
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