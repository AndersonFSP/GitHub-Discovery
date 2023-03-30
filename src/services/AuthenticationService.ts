import type { UserParams } from '@/stores/modules/authentication/types'
import { firebaseAuth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
  signOut,
  updateEmail
} from 'firebase/auth'

export default {
  login({ email, password }: UserParams) {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  },
  async register({ email, password, displayName }: UserParams) {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    await updateProfile(userCredential.user, { displayName })
  },
  async update({ email, displayName }: Omit<UserParams, 'password'>) {
    const user = this.getCurrentUser() as User
    await Promise.all([updateProfile(user, { displayName }), updateEmail(user, email)])
  },
  logout() {
    return signOut(firebaseAuth)
  },
  getCurrentUser(): User | null {
    return firebaseAuth.currentUser
  }
}
