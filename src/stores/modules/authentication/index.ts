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
      this.toggleAuth()
    },
    async register(user: UserParams) {
      await AuthenticationService.register(user)
    },
    verifyIfIsLogged(): User | null {
      console.log(AuthenticationService.getCurrentUser())
      return AuthenticationService.getCurrentUser()
    },
    async logout() {
      AuthenticationService.logout()
      this.toggleAuth()
    }
  }
})