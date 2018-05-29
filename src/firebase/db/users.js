
import { db } from './../firebase'
import { auth } from './../index'

export const onceGetUsers = () => db.ref('users').once('value')


export const handleSignUp = async (form) => {
  const authUser = await auth.doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
  await authUser.updateProfile({ displayName: form.username })
  const user = { id: authUser.uid, name: authUser.displayName, email: authUser.email, likes: [], tables: [] }
  await db.ref(`/users/${authUser.uid}`).set(user)
}

export const handleSignIn = async (email, password) => {
  await auth.doSignInWithEmailAndPassword(email, password)
}

export const setUser = async (id, user) => {
  await db.ref(`/users/${id}`).set(user)
}

export const getUser = async (id) => {
  const userRef = await db.ref(`/users/${id}`).once('value')
  return userRef.val()
}

