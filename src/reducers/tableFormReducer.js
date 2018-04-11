
import { showNotification } from './notificationReducer'


const initialForm = {
  title: '',
  description: '',
  phonenum: '',
  openhours: '',
  location: {
    active: false,
    lngLat: { lng: '', lat: '' },
    confirmed: false,
    zoom: null
  }
}


const tableFormReducer = (store = initialForm, action) => {

  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...store, [action.name]: action.value }

    case 'TOGGLE_LOCATION_INPUT_STATE':
      let { active, confirmed } = store.location
      if (active && !confirmed) { active = true; confirmed = true }
      if (active && confirmed) { active = true; confirmed = false }
      if (!active) { active = true; confirmed = false }
      return { ...store, location: { ...store.location, active, confirmed } }

    case 'SET_LNGLAT_2NEW':
      const lngLat = { lng: action.lngLat.lng.toFixed(6), lat: action.lngLat.lat.toFixed(6) }
      const zoom = action.zoom
      let location = store.location
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
    dispatch({ type: 'TOGGLE_LOCATION_INPUT_STATE' })
    dispatch(showNotification({ type: 'info', text: 'Drag or click the yellow point to desired location' }, 10))
  }
}

export const confirmLocation = () => {
  return (dispatch) => {
    dispatch({ type: 'CONFIRM_LOCATION' })
  }
}

export const hideForm = (history) => {
  history.push('/')
  return (dispatch) => {
    dispatch({ type: 'SET_LOCINPUT_UNACTIVE' })
  }
}

export const handleSubmit = (e, history, form) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch({ type: 'SUBMIT', form })
    dispatch(showNotification({ type: 'alert', text: 'Add new table not supported yet' }, 3))
    history.push('/')
  }
}

export default tableFormReducer
