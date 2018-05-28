
import { showNotification } from './notificationReducer'
import { auth, database, firebase } from './../firebase/index'
import history from './../history'


const initialUserState = {
  loggedInUser: null,
  loginForm: { email: '', password: '', error: null },
  signUpForm: { username: '', email: '', passwordOne: '', passwordTwo: '', error: null }
}


const userStateReducer = (store = initialUserState, action) => {

  let loggedInUser, user, likes, tables, usertables

  switch (action.type) {

    case 'SET_USER_LOGGED_IN':
      user = action.user
      likes = user.likes ? user.likes : []
      tables = user.likes ? user.tables : []
      loggedInUser = { id: user.id, anonymous: user.anonymous, name: user.name, email: user.email, likes, tables }
      return { ...store, loggedInUser }

    case 'SET_USER_LOGGED_OUT':
      return { ...store, loggedInUser: null }

    case 'UPDATE_SIGNUP_FORM':
      return { ...store, signUpForm: { ...store.signUpForm, [action.name]: action.value } }

    case 'UPDATE_LOGIN_FORM':
      return { ...store, loginForm: { ...store.loginForm, [action.name]: action.value } }

    case 'EMPTY_SIGNUP_FORM':
      return { ...store, signUpForm: { ...initialUserState.signUpForm } }

    case 'EMPTY_LOGIN_FORM':
      return { ...store, loginForm: { ...initialUserState.loginForm } }

    case 'LIKE_FEATURE':
    case 'UNLIKE_FEATURE':
      return { ...store, loggedInUser: { ...store.loggedInUser, likes: action.userLikes } }

    case 'ADD_FEATURE':
      usertables = store.loggedInUser.tables ? store.loggedInUser.tables : []
      tables = usertables.concat(action.newFeature.properties.id)
      return { ...store, loggedInUser: { ...store.loggedInUser, tables } }

    case 'REMOVE_FEATURE':
      usertables = store.loggedInUser.tables ? store.loggedInUser.tables : []
      tables = usertables.filter((featureId => featureId !== action.id))
      return { ...store, loggedInUser: { ...store.loggedInUser, tables } }

    default:
      return store
  }

}

export const startListeningToLoggedInUser = () => {
  return async (dispatch) => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setLoggedInUser(user))
        console.log('User state change: \nanynomous: ', user.isAnonymous, '\n', user.uid, '\n', user.displayName, '\n', user.email, '\n')
      } else {
        firebase.auth.signInAnonymously()
          .catch(error => { console.log('Error in anynomous sign in: \n', error) })
      }
    })
  }
}


export const handleSignUpFormChange = (e) => {
  return { type: 'UPDATE_SIGNUP_FORM', name: e.target.name, value: e.target.value }
}
export const emptySignUpForm = () => {
  return { type: 'EMPTY_SIGNUP_FORM' }
}

export const handleLoginFormChange = (e) => {
  return { type: 'UPDATE_LOGIN_FORM', name: e.target.name, value: e.target.value }
}
export const emptyLoginForm = () => {
  return { type: 'EMPTY_LOGIN_FORM' }
}


export const closeSignUpForm = (e) => {
  e.preventDefault()
  return (dispatch) => {
    history.push('/')
  }
}
export const closeLoginForm = (e) => {
  e.preventDefault()
  return (dispatch) => {
    history.push('/')
  }
}

export const openSignUpForm = (e) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch({ type: 'EMPTY_LOGIN_FORM' })
    history.push('/signup')
  }
}

export const openLoginForm = (e) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch({ type: 'EMPTY_SIGNUP_FORM' })
    history.push('/login')
  }
}


export const submitSignUp = (e, form) => {
  return async (dispatch) => {
    e.preventDefault()
    try {
      const authUser = await auth.doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
      await authUser.updateProfile({ displayName: form.username })
      const user = { id: authUser.uid, name: authUser.displayName, email: authUser.email, likes: [], tables: [] }
      await database.ref(`/users/${authUser.uid}`).set(user)
      //dispatch(showNotification({ type: 'success', text: `Sign up successfull, welcome ${form.username}!` }, 6))
      dispatch({ type: 'EMPTY_SIGNUP_FORM' })
      history.push('/')
    } catch (error) {
      console.log('Error in creating profile: \n', error)
      dispatch({ type: 'UPDATE_SIGNUP_FORM', name: 'error', value: error })
      dispatch(showNotification({ type: 'alert', text: error.message }, 6))
    }
  }
}

export const submitLogin = (e, form) => {
  return async (dispatch) => {
    e.preventDefault()
    try {
      await auth.doSignInWithEmailAndPassword(form.email, form.password)
      dispatch({ type: 'EMPTY_LOGIN_FORM' })
      history.push('/')
    } catch (error) {
      console.log('Error in logging in: \n', error)
      dispatch({ type: 'UPDATE_LOGIN_FORM', name: 'error', value: error })
      dispatch(showNotification({ type: 'alert', text: error.message }, 6))
    }
  }
}

export const setLoggedInUser = (authUser) => {
  return async (dispatch) => {
    if (authUser.isAnonymous) {
      try {
        const userRef = await database.ref(`/users/${authUser.uid}`).once('value')
        const user = {
          ...userRef.val(),
          id: authUser.uid,
          anonymous: true,
          name: null,
          email: null
        }
        await database.ref(`/users/${authUser.uid}`).set(user)
        dispatch({ type: 'SET_USER_LOGGED_IN', user })
      } catch (error) {
        console.log('Error in logging in anonymous user: \n', error)
      }
    } else try {
      const userRef = await database.ref(`/users/${authUser.uid}`).once('value')
      const user = { ...userRef.val(), anonymous: false }
      dispatch({ type: 'SET_USER_LOGGED_IN', user })
      dispatch(showNotification({ type: 'success', text: `Signed in, welcome ${user.name}!` }, 6))
    } catch (error) {
      console.log('Error in logging in: \n', error)
    }
  }
}


export const logOut = () => {
  return async (dispatch) => {
    try {
      await auth.doSignOut()
      dispatch({ type: 'SET_USER_LOGGED_OUT' })
      dispatch(showNotification({ type: 'alert', text: 'Logged out' }, 4))
    } catch (error) {
      console.log('Error in logging out: \n', error)
    }
  }
}


export default userStateReducer
