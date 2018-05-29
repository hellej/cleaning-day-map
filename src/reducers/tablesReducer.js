import { createGeoJSON } from './../components/mapboxhelper'
import { showNotification } from './notificationReducer'
import { zoomAndOpenFeature } from './mapControlReducer'
import { setMapFeaturePopup, closePopup } from './mapPopupReducer'
import { featureService } from './../firebase/index'
import history from './../history'

const initialFeatureCollection = {
  type: 'FeatureCollection',
  features: []
}

const tablesReducer = (store = initialFeatureCollection, action) => {

  let featuresToUpdate

  switch (action.type) {
    case 'INIT_FEATURES':
      return action.featureCollection

    case 'ADD_FEATURE':
      featuresToUpdate = store.features.concat(action.newFeature)
      return { ...store, features: featuresToUpdate }

    case 'REMOVE_FEATURE':
      featuresToUpdate = store.features.filter(feature => feature.properties.id !== action.id)
      return { ...store, features: featuresToUpdate }

    case 'UPDATE_FEATURE':
      featuresToUpdate = store.features.map(feature =>
        feature.properties.id === action.id
          ? action.editedFeature
          : feature)
      return { ...store, features: featuresToUpdate }

    case 'LIKE_FEATURE':
    case 'UNLIKE_FEATURE':
      featuresToUpdate = store.features.map(feature =>
        feature.properties.id !== action.id
          ? feature
          : { ...feature, properties: { ...feature.properties, likes: action.likes } })
      return { ...store, features: featuresToUpdate }

    default:
      return store
  }
}


export const tablesInitialization = () => {
  return async (dispatch) => {
    try {
      const featureCollection = await featureService.onceGetAllAsCollection()
      dispatch({ type: 'INIT_FEATURES', featureCollection })
    } catch (error) {
      console.log('Error in tables initialization: \n', error)
      dispatch(showNotification({ type: 'alert', text: 'Could not load tables' }, 7))
    }
  }
}


export const addFeature = (props, loggedInUser) => {
  return async (dispatch) => {
    const newFeature = createGeoJSON(props)
    try {
      newFeature.properties.id = await featureService.addFeature(newFeature, loggedInUser)
      dispatch({ type: 'ADD_FEATURE', newFeature })
      dispatch(showNotification({ type: 'success', text: 'New table added to database' }, 4))
      dispatch({ type: 'EMPTY_TABLEFORM' })
      dispatch(zoomAndOpenFeature(newFeature, 16))
    } catch (error) {
      history.push('/addtable')
      console.log('Error in saving new table: \n', error)
      dispatch(showNotification({ type: 'alert', text: 'Could not add table' }, 6))
    }
  }
}

export const editFeature = (props) => {
  return async (dispatch) => {
    try {
      const editedFeature = await featureService.updateFeature(props)
      dispatch({ type: 'UPDATE_FEATURE', id: props.id, editedFeature })
      dispatch(showNotification({ type: 'success', text: 'Table saved succesfully' }, 4))
      dispatch({ type: 'EMPTY_TABLEFORM' })
      dispatch(setMapFeaturePopup(editedFeature))
      history.push('/')
    } catch (error) {
      history.push('/addtable')
      console.log('Error in saving new table: \n', error)
      dispatch(showNotification({ type: 'alert', text: 'Could not save table' }, 6))
    }
  }
}

export const removeFeature = (feature, loggedInUser, e) => {
  return async (dispatch) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    const error = validateRemove(feature, loggedInUser)
    if (error) {
      dispatch(showNotification({ type: 'alert', text: error }, 4))
      return
    }
    const ok = window.confirm(`Remove table: ${feature.properties.title} ?`)
    if (ok === false) return

    const id = feature.properties.id

    try {
      await featureService.removeFeature(id, loggedInUser)
      dispatch({ type: 'REMOVE_FEATURE', id })
      dispatch(closePopup())
      dispatch(showNotification({ type: 'success', text: 'Table removed' }, 4))
    } catch (error) {
      dispatch(showNotification({ type: 'alert', text: 'Could not remove table' }, 6))
      console.log('Error in removing table: \n', error)
    }
  }
}

export const toggleLikeTable = (feature, loggedInUser, e) => {
  return async (dispatch) => {
    if (e) e.stopPropagation()

    try {
      const id = feature.properties.id
      const likedChangeSet = await featureService.toggleLikeFeature(feature, loggedInUser)
      if (likedChangeSet.likedBefore) {
        dispatch({
          type: 'UNLIKE_FEATURE',
          id,
          likes: likedChangeSet.tableLikes,
          uid: loggedInUser.id,
          userLikes: likedChangeSet.userLikes
        })
      } else {
        dispatch({
          type: 'LIKE_FEATURE',
          id,
          likes: likedChangeSet.tableLikes,
          uid: loggedInUser.id,
          userLikes: likedChangeSet.userLikes
        })
      }
    } catch (error) {
      console.log('Error in like table: \n', error)
      dispatch(showNotification({ type: 'alert', text: 'Could not like table' }, 6))
    }
  }
}


const validateRemove = (feature, loggedInUser) => {
  if (!loggedInUser || loggedInUser.anonymous) return 'You must log in first'
  if (!feature.properties.user || feature.properties.user !== loggedInUser.id) {
    return 'Cannot delete someone elses table'
  }
  return null
}


export default tablesReducer

