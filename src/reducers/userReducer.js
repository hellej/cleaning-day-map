
import { showNotification } from './notificationReducer'
import { auth, database } from './../firebase/index'

const initialUserState = {
  loggedInUser: null, //{ id: '', email: '', displayName: '' },
  loginForm: { email: '', password: '', error: null },
  signUpForm: { username: '', email: '', passwordOne: '', passwordTwo: '', error: null }
}


const userStateReducer = (store = initialUserState, action) => {

  let loggedInUser, user

  switch (action.type) {
    case 'UPDATE_SIGNUP_FORM':
      return { ...store, signUpForm: { ...store.signUpForm, [action.name]: action.value } }

    case 'UPDATE_LOGIN_FORM':
      return { ...store, loginForm: { ...store.loginForm, [action.name]: action.value } }

    case 'EMPTY_SIGNUP_FORM':
      return { ...store, signUpForm: { ...initialUserState.signUpForm } }

    case 'EMPTY_LOGIN_FORM':
      return { ...store, loginForm: { ...initialUserState.loginForm } }

    case 'SET_USER_LOGGED_IN':
      user = action.user
      loggedInUser = { id: user.uid, displayName: user.displayName, email: user.email }
      return { ...store, loggedInUser }

    case 'SET_USER_LOGGED_OUT':
      return { ...store, loggedInUser: null }

    default:
      return store
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


export const closeSignUpForm = (e, history) => {
  e.preventDefault()
  return (dispatch) => {
    history.push('/')
  }
}
export const closeLoginForm = (e, history) => {
  e.preventDefault()
  return (dispatch) => {
    history.push('/')
  }
}

export const openSignUpForm = (e, history) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch({ type: 'EMPTY_LOGIN_FORM' })
    history.push('/signup')
  }
}

export const openLoginForm = (e, history) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch({ type: 'EMPTY_SIGNUP_FORM' })
    history.push('/login')
  }
}


export const submitSignUp = (e, history, form) => {
  return async (dispatch) => {
    e.preventDefault()
    try {
      const authUser = await auth.doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
      await authUser.updateProfile({ displayName: form.username })
      const user = { id: authUser.uid, name: authUser.displayName, email: authUser.email }
      await database.ref(`/users/${authUser.uid}`).set(user)
      dispatch(setLoggedInUser(authUser))
      dispatch(showNotification({ type: 'success', text: `Sign up successfull - welcome ${form.username}!` }, 6))
      dispatch({ type: 'EMPTY_SIGNUP_FORM' })
      history.push('/')
    } catch (error) {
      console.log('Error in creating profile: ', error)
      dispatch({ type: 'UPDATE_SIGNUP_FORM', name: 'error', value: error })
      dispatch(showNotification({ type: 'alert', text: error.message }, 6))
    }
  }
}

export const submitLogin = (e, history, form) => {
  return async (dispatch) => {
    e.preventDefault()
    try {
      await auth.doSignInWithEmailAndPassword(form.email, form.password)
      const user = await auth.currentUser()
      dispatch(showNotification({ type: 'success', text: `Signed in - welcome ${user.displayName}!` }, 6))
      dispatch({ type: 'EMPTY_LOGIN_FORM' })
      history.push('/')
    } catch (error) {
      dispatch({ type: 'UPDATE_LOGIN_FORM', name: 'error', value: error })
      dispatch(showNotification({ type: 'alert', text: error.message }, 6))
    }
  }
}

export const setLoggedInUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'SET_USER_LOGGED_IN', user })
  }
}

export const setUserLoggedOut = (user) => {
  return (dispatch) => {
    dispatch({ type: 'SET_USER_LOGGED_OUT' })
  }
}

export const logOut = () => {
  return async (dispatch) => {
    try {
      await auth.doSignOut()
      dispatch({ type: 'SET_USER_LOGGED_OUT' })
      dispatch(showNotification({ type: 'alert', text: 'Logged out' }, 4))
    } catch (error) {
      console.log('Error in logOut: ', error)
    }
  }
}


export default userStateReducer
