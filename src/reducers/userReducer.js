
import { showNotification } from './notificationReducer'
import { auth, database } from './../firebase/index'

const initialUserState = {
  loggedInUser: null,
  loginForm: { email: '', password: '', error: null },
  signUpForm: { username: '', email: '', passwordOne: '', passwordTwo: '', error: null }
}


const userStateReducer = (store = initialUserState, action) => {

  let loggedInUser, user, likes

  switch (action.type) {

    case 'SET_USER_LOGGED_IN':
      user = action.user
      likes = user.likes ? user.likes : null
      loggedInUser = { id: user.id, anonymous: user.anonymous, name: user.name, email: user.email, likes }
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

    case 'LIKE_TABLE':
    case 'UNLIKE_TABLE':
      return { ...store, loggedInUser: { ...store.loggedInUser, likes: action.userLikes } }

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
      const user = { id: authUser.uid, name: authUser.displayName, email: authUser.email, likes: [] }
      await database.ref(`/users/${authUser.uid}`).set(user)
      dispatch(setLoggedInUser(authUser))
      dispatch(showNotification({ type: 'success', text: `Sign up successfull, welcome ${form.username}!` }, 6))
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
      dispatch(showNotification({ type: 'success', text: `Signed in, welcome ${user.displayName}!` }, 6))
      dispatch({ type: 'EMPTY_LOGIN_FORM' })
      history.push('/')
    } catch (error) {
      dispatch({ type: 'UPDATE_LOGIN_FORM', name: 'error', value: error })
      dispatch(showNotification({ type: 'alert', text: error.message }, 6))
    }
  }
}

export const setLoggedInUser = (authUser) => {
  return async (dispatch) => {
    if (authUser.isAnonymous) {
      try {
        const userLikesRef = await database.ref(`/users/${authUser.uid}/likes`).once('value')
        const userLikes = userLikesRef.val()
        const user = { id: authUser.uid, anonymous: true, name: null, email: null, likes: userLikes }
        await database.ref(`/users/${authUser.uid}`).set(user)
        dispatch({ type: 'SET_USER_LOGGED_IN', user })
      } catch (error) {
        console.log('Error in logging in anonymous user: ', error)
      }
    } else try {
      const userRef = await database.ref(`/users/${authUser.uid}`).once('value')
      const user = { ...userRef.val(), anonymous: false }
      dispatch({ type: 'SET_USER_LOGGED_IN', user })
    } catch (error) {
      console.log('Error in logging in: ', error)
    }
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
