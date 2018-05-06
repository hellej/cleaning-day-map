
import { showNotification } from './notificationReducer'
import { zoomToFeature, selectTable } from './mapControlReducer'
import { addTable } from './tablesReducer'

const initialForm = {
  title: '',
  description: '',
  phonenum: '',
  openhours: '',
  location: {
    active: false,
    lngLat: { lng: null, lat: null },
    confirmed: false,
    zoom: null
  },
  error: null
}

const phoneScreen = (window) => {
  if (window.innerWidth < 640 && window.innerHeight < 900) {
    return true
  } return false
}



const tableFormReducer = (store = initialForm, action) => {

  let active, confirmed, lngLat, zoom, location = null

  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...store, [action.name]: action.value }

    case 'TOGGLE_LOCINPUT_STATE':
      active = store.location.active
      confirmed = store.location.confirmed
      if (active && confirmed) { active = true; confirmed = false }
      else if (!active) { active = true; confirmed = false }
      return { ...store, location: { ...store.location, active, confirmed } }

    case 'SET_LOCINPUT_ACTIVE':
      active = true
      confirmed = false
      return { ...store, location: { ...store.location, active, confirmed } }

    case 'SET_LNGLAT_2NEW':
      lngLat = { lng: action.lngLat.lng.toFixed(6), lat: action.lngLat.lat.toFixed(6) }
      zoom = action.zoom
      location = store.location
      return { ...store, location: { ...location, lngLat, zoom } }

    case 'CONFIRM_LOCATION':
      location = store.location
      return { ...store, location: { ...location, confirmed: true } }

    case 'SET_LOCINPUT_UNACTIVE':
      location = store.location
      return { ...store, location: { ...location, active: false, confirmed: false } }

    case 'SUBMIT':
      console.log('form submitted: ', action.form)
      return initialForm

    case 'SET_TABLEFORM_ERROR':
      return { ...store, error: action.error }

    default:
      return store
  }
}


export const handleFormChange = (e) => {
  return { type: 'UPDATE_FORM', name: e.target.name, value: e.target.value }
}

export const setLngLatZoomForNew = (lngLat, zoom) => {
  return {
    type: 'SET_LNGLAT_2NEW',
    lngLat,
    zoom
  }
}

export const toggleLocationInputActive = () => {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_LOCINPUT_STATE' })
    dispatch(showNotification({ type: 'info', text: 'Drag or click the yellow point to desired location' }, 10))
  }
}


export const setLocationInputActive = (history) => {
  return async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    dispatch({ type: 'SET_LOCINPUT_ACTIVE' })
    dispatch(showNotification({ type: 'info', text: 'Drag or click the yellow point to desired location' }, 10))
    if (phoneScreen(window)) { history.push('/addtable/location') }
  }
}

export const confirmLocation = (history) => {
  return async (dispatch) => {
    dispatch({ type: 'CONFIRM_LOCATION' })
    if (history.location.pathname !== '/addtable') {
      await new Promise(resolve => setTimeout(resolve, 500))
      history.push('/addtable')
    }
  }
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

export const handleSubmit = (e, history, form, loggedInUser) => {
  e.preventDefault()
  const geometry = { coordinates: [form.location.lngLat.lng, form.location.lngLat.lat] }
  const error = validate(form, loggedInUser)
  if (error) {
    return (dispatch) => {
      dispatch(showNotification({ type: 'alert', text: error }, 4))
      dispatch({ type: 'SET_TABLEFORM_ERROR', error })
    }
  }

  return (dispatch) => {
    dispatch(addTable(form))
    dispatch(zoomToFeature(geometry, 16))
    dispatch(selectTable(form))
    dispatch({ type: 'SUBMIT', form })
    history.push('/')
  }
}

const validate = (form, loggedInUser) => {
  if (!loggedInUser) {
    return 'You must log in first'
  }
  if (!form.title || form.title.trim() === '') {
    return 'Title is missing'
  }
  if (!form.description || form.description.trim() === '') {
    return 'Description is missing'
  }
  if (!form.location.confirmed) {
    return 'Location must be confirmed first'
  }
  return null
}


export default tableFormReducer
