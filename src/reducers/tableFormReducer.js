
import { showNotification } from './notificationReducer'
import { addTable } from './tablesReducer'
import { zoomToFeature } from './mapControlReducer'

const initialForm = {
  editing: false,
  id: null,
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
  editLngLat: { lng: null, lat: null },
  error: null
}

const phoneScreen = (window) => {
  if (window.innerWidth < 640 && window.innerHeight < 900) {
    return true
  } return false
}



const tableFormReducer = (store = initialForm, action) => {

  let active, confirmed, lngLat, zoom, location

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
      console.log('action.lngLat: ', action.lngLat)
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

    case 'EMPTY_FORM':
      return initialForm

    case 'START_EDITING': {
      const { id, title, description, phonenum, openhours } = action.table.properties
      const coords = action.table.geometry.coordinates
      const editLngLat = { lng: coords[0].toFixed(6), lat: coords[1].toFixed(6) }
      const location = { active: true, confirmed: true, zoom: null, lngLat: { ...editLngLat } }
      return { editing: true, id, title, description, phonenum, openhours, location, editLngLat, error: null }
    }

    case 'STOP_EDITING':
      return { ...store, editing: false }

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

export const setLocationInputActive = (history, form) => {
  return async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    dispatch({ type: 'SET_LOCINPUT_ACTIVE' })
    dispatch(showNotification({ type: 'info', text: 'Drag or click the yellow point to desired location' }, 10))
    if (phoneScreen(window)) {
      form.editing
        ? history.push('/edittable/location')
        : history.push('/addtable/location')
    }
  }
}

export const confirmLocation = (history) => {
  return async (dispatch) => {
    dispatch({ type: 'CONFIRM_LOCATION' })
    const path = history.location.pathname
    if (path !== '/addtable') {
      console.log('history: ', history.location.pathname)
      await new Promise(resolve => setTimeout(resolve, 400))
      path.indexOf('edittable') !== -1
        ? history.push('/edittable')
        : history.push('/addtable')
    }
  }
}

export const closeForm = (history, editing) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOCINPUT_UNACTIVE' })
    dispatch({ type: 'STOP_EDITING' })
    history.push('/')
    if (editing) {
      dispatch({ type: 'EMPTY_FORM' })
    }
  }
}

export const handleSubmit = (e, history, form, loggedInUser) => {
  e.preventDefault()
  const error = validate(form, loggedInUser)
  if (error) {
    return (dispatch) => {
      dispatch(showNotification({ type: 'alert', text: error }, 4))
      dispatch({ type: 'SET_TABLEFORM_ERROR', error })
    }
  }
  return (dispatch) => {
    const props = { ...form, user: loggedInUser.id }
    dispatch(addTable(props))
    dispatch({ type: 'EMPTY_FORM', form })
    history.push('/')
  }
}

export const startEditing = (table, loggedInUser, e, history) => {
  return async (dispatch) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    console.log('table to edit: ', table)
    dispatch({ type: 'START_EDITING', table })
    history.push('/edittable')
    dispatch(zoomToFeature(table.geometry, 16))
  }
}

export const handleSave = (table, loggedInUser, e, history) => {
  return async (dispatch) => {
    console.log('table to save: ', table)
    console.log('user saving: ', loggedInUser)
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
