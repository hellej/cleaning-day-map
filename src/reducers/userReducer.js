
import { showNotification } from './notificationReducer'
import { userService } from './../firebase/index'
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
    userService.onAuthStateChanged(authUser => {
      if (authUser) {
        authUser.isAnonymous
          ? dispatch(setLoggedInAnonymous(authUser))
          : dispatch(setLoggedInUser(authUser))
        console.log('User state change: \nanynomous: ', authUser.isAnonymous, '\n', authUser.uid, '\n', authUser.displayName, '\n', authUser.email, '\n')
      } else {
        userService.signInAnonymously()
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
      history.push('/')
      dispatch(showNotification({ type: 'load', text: 'Signing up...' }, 5))
      await userService.handleSignUp(form)
      dispatch({ type: 'EMPTY_SIGNUP_FORM' })
    } catch (error) {
      history.push('/signup')
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
      history.push('/')
      dispatch(showNotification({ type: 'load', text: 'Logging in...' }, 5))
      await userService.handleSignIn(form.email, form.password)
      dispatch({ type: 'EMPTY_LOGIN_FORM' })
    } catch (error) {
      history.push('/login')
      console.log('Error in logging in: \n', error)
      dispatch({ type: 'UPDATE_LOGIN_FORM', name: 'error', value: error })
      dispatch(showNotification({ type: 'alert', text: error.message }, 6))
    }
  }
}

export const setLoggedInAnonymous = (authUser) => {
  return async (dispatch) => {
    const anonymousUser = await userService.getUser(authUser.uid)
    try {
      const user = {
        ...anonymousUser,
        id: authUser.uid,
        anonymous: true,
        name: null,
        email: null
      }
      await userService.setUser(authUser.uid, user)
      dispatch({ type: 'SET_USER_LOGGED_IN', user })
    } catch (error) {
      console.log('Error in logging in anonymous user: \n', error)
    }
  }
}

export const setLoggedInUser = (authUser) => {
  return async (dispatch) => {
    try {
      let user = await userService.getUser(authUser.uid)
      if (!user) {
        for (let i = 1; i < 5; i++) {
          await new Promise(resolve => setTimeout(resolve, 150))
          user = await userService.getUser(authUser.uid)
          if (user) break
        }
        if (!user) {
          history.push('/')
          dispatch(showNotification({ type: 'error', text: 'Could not load user profile' }, 4))
        }
      }
      user = { ...user, anonymous: false }
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
      await userService.signOut()
      dispatch({ type: 'SET_USER_LOGGED_OUT' })
      dispatch(showNotification({ type: 'alert', text: 'Logged out' }, 4))
    } catch (error) {
      console.log('Error in logging out: \n', error)
    }
  }
}


export default userStateReducer
