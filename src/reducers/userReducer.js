
import { showNotification } from './notificationReducer'
import { auth } from './../firebase/index'

const initialUserState = {
  loggedUser: { username: null, name: null, id: null },
  loginForm: { email: '', password: '' },
  signUpForm: { username: '', email: '', passwordOne: '', passwordTwo: '' }
}


const userStateReducer = (store = initialUserState, action) => {

  let active, confirmed = null

  switch (action.type) {
    case 'UPDATE_SIGNUP_FORM':
      return { ...store, signUpForm: { ...store.signUpForm, [action.name]: action.value } }

    case 'UPDATE_LOGIN_FORM':
      return { ...store, loginForm: { ...store.loginForm, [action.name]: action.value } }

    case 'SET_LOCINPUT_ACTIVE':
      active = true
      confirmed = false
      return { ...store, location: { ...store.location, active, confirmed } }

    case 'SUBMIT':
      console.log('form submitted: ', action.form)
      return initialUserState

    default:
      return store
  }

}


export const handleSignUpFormChange = (e) => {
  return { type: 'UPDATE_SIGNUP_FORM', name: e.target.name, value: e.target.value }
}

export const handleLoginFormChange = (e) => {
  return { type: 'UPDATE_LOGIN_FORM', name: e.target.name, value: e.target.value }
}


export const hideForm = (history) => {
  history.push('/')
}

export const closeForm = (history) => {
  history.push('/')
  return (dispatch) => {
    dispatch({ type: 'SET_LOCINPUT_UNACTIVE' })
  }
}

export const signUp = (e, history, form) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch(showNotification({ type: 'alert', text: 'Add new table not quite supported yet' }, 4))
    auth.doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
    history.push('/login')
  }
}

export default userStateReducer
