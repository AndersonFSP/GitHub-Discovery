import type { UserParams } from '@/stores/modules/authentication/types'
import { firebaseAuth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type User } from 'firebase/auth'

export default {
  login({ email, password }: UserParams) {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  },
  async register({ email, password, displayName }: UserParams) {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )
    await updateProfile(userCredential.user, { displayName })
  },
  getCurrentUser(): User | null {
    return firebaseAuth.currentUser
  }
}
