import { auth } from './firebase'

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const doSignInAnonymously = () =>
  auth.signInAnonymously()

// export const currentUser = () =>
//   auth.currentUser()

export const doSignOut = () =>
  auth.signOut()



// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email)
// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password)