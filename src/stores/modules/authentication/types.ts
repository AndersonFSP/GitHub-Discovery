import type { User } from 'firebase/auth';

export interface AuthenticationState {
  isUserLogged: boolean
  user: User | null
}

export interface UserParams {
  email: string
  password: string
  displayName?: string
}