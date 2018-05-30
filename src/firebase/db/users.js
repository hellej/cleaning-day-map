
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

export const removeUser = async (id) => {
  await db.ref('users').child(id).remove()
}

export const signOut = async (id) => {
  await auth.doSignOut()
}

export const getAll = async (id) => {
  const snapshot = await db.ref('users').once('value')
  const users = Object.values(snapshot.val())
  return users
}

export const removeAnonymous = async (id) => {
  const users = await getAll()
  const anonymousUsers = users.filter(user => user.anonymous)
  const anonymousIDs = anonymousUsers.map(user => user.id)
  for (id in anonymousIDs) {
    await removeUser(anonymousIDs[id])
  }
}

