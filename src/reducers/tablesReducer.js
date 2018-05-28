import { createGeoJSON } from './../components/mapboxhelper'
import { database } from './../firebase/index'
import { showNotification } from './notificationReducer'
import { zoomToFeature } from './mapControlReducer'


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
      const snapshot = await database.ref('tables').once('value')
      const features = Object.values(snapshot.val())
      const featureCollection = {
        type: 'FeatureCollection',
        features: features
      }
      dispatch({ type: 'INIT_FEATURES', featureCollection })
    } catch (error) {
      console.log('Error in tables initialization: \n', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't load tables" }, 7))
    }
  }
}


export const addFeature = (props, history, loggedInUser) => {
  return async (dispatch) => {
    const newFeature = createGeoJSON(props)
    const geometry = { coordinates: [props.location.lngLat.lng, props.location.lngLat.lat] }

    try {
      const ref = await database.ref('/tables').push(newFeature)
      database.ref(`/tables/${ref.key}/properties/id`).set(ref.key)
      newFeature.properties.id = ref.key
      dispatch({ type: 'ADD_FEATURE', newFeature })
      const userTablesFer = await database.ref(`/users/${loggedInUser.id}/tables`).once('value')
      const userTables = userTablesFer.val() ? userTablesFer.val().concat(ref.key) : [ref.key]
      database.ref(`/users/${loggedInUser.id}/tables`).set(userTables)
      dispatch(showNotification({ type: 'success', text: 'New table added to database' }, 4))
      dispatch(zoomToFeature(geometry, 16))
      dispatch({ type: 'EMPTY_TABLEFORM' })
      history.push('/')
    } catch (error) {
      console.log('Error in saving new table: \n', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't add table" }, 6))
    }
  }
}

export const editFeature = (props, history) => {
  return async (dispatch) => {
    const id = props.id
    try {
      const featureLikesRef = await database.ref(`/tables/${id}/properties/likes`).once('value')
      props.likes = featureLikesRef.val() ? featureLikesRef.val() : props.likes
      const editedFeature = createGeoJSON(props)
      console.log('editedFeature', editedFeature)
      database.ref(`/tables/${id}`).set(editedFeature)
      dispatch({ type: 'UPDATE_FEATURE', id, editedFeature })
      dispatch(showNotification({ type: 'success', text: 'Table saved succesfully' }, 4))
      dispatch({ type: 'EMPTY_TABLEFORM' })
      history.push('/')
    } catch (error) {
      console.log('Error in saving new table: \n', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't save table" }, 6))
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
      await database.ref('tables').child(id).remove()
      const userTablesRef = await database.ref(`/users/${loggedInUser.id}/tables`).once('value')
      let userTables = userTablesRef.val()
      userTables = userTables.filter(featureId => featureId !== id)
      await database.ref(`/users/${loggedInUser.id}/tables`).set(userTables)
      dispatch({ type: 'REMOVE_FEATURE', id })
      dispatch(showNotification({ type: 'success', text: 'Table removed' }, 4))
    } catch (error) {
      dispatch(showNotification({ type: 'alert', text: "Couldn't remove table" }, 6))
      console.log('Error in removing table: \n', error)
    }
  }
}

export const toggleLikeTable = (feature, loggedInUser, e) => {
  return async (dispatch) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    const id = feature.properties.id
    const tableLikesDB = database.ref(`/tables/${id}/properties/likes`)
    const userLikesDB = database.ref(`/users/${loggedInUser.id}/likes`)
    const likedBefore = loggedInUser.likes !== null && loggedInUser.likes.indexOf(id) !== -1

    try {
      const tableLikesRef = await tableLikesDB.once('value')
      let tableLikes = tableLikesRef.val()
      let userLikes = loggedInUser.likes

      if (likedBefore) {
        userLikes = userLikes !== null ? userLikes.filter(tableid => tableid !== id) : []
        dispatch({ type: 'UNLIKE_FEATURE', id, likes: tableLikes - 1, uid: loggedInUser.id, userLikes })
        tableLikesDB.set(tableLikes - 1)
        userLikesDB.set(userLikes)
      } else {
        userLikes ? userLikes.push(id) : userLikes = [id]
        dispatch({ type: 'LIKE_FEATURE', id, likes: tableLikes + 1, uid: loggedInUser.id, userLikes })
        tableLikesDB.set(tableLikes + 1)
        userLikesDB.set(userLikes)
      }
    } catch (error) {
      console.log('Error in like table: \n', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't like table" }, 6))
    }
  }
}


const validateRemove = (feature, loggedInUser) => {
  if ((!loggedInUser || loggedInUser.anonymous) && loggedInUser.id !== feature.properties.user) {
    return 'You must log in first'
  }
  if (!feature.properties.user || feature.properties.user !== loggedInUser.id) {
    return 'You cannot delete someone elses table'
  }
  return null
}


export default tablesReducer

