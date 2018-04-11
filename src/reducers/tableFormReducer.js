
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

    case 'SET_LOCINPUT_ACTIVE':
      let location = store.location
      return { ...store, location: { ...location, active: true } }

    case 'SET_LNGLAT_2NEW':
      const lngLat = { lng: action.lngLat.lng.toFixed(6), lat: action.lngLat.lat.toFixed(6) }
      const zoom = action.zoom
      location = store.location
      return { ...store, location: { ...location, lngLat, zoom } }

    case 'CONFIRM_LOCATION':
      location = store.location
      return { ...store, location: { ...location, confirmed: true } }

    case 'SET_LOCINPUT_UNACTIVE':
      location = store.location
      return { ...store, location: { ...location, active: false } }

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

export const setLocationInputActive = (lngLat) => {

  return (dispatch) => {
    dispatch({ type: 'SET_LOCINPUT_ACTIVE' })
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
