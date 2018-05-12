// import { tables } from './../tables'
import { createGeoJSON } from './../components/mapboxhelper'
import { database } from './../firebase/index'
import { showNotification } from './notificationReducer'
import { selectTable, zoomToFeature } from './mapControlReducer'


const initialTables = {
  type: 'FeatureCollection',
  features: []
}

const tablesReducer = (store = initialTables, action) => {

  let featuresToUpdate = null

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables

    case 'SET_TABLES':
      return action.tables

    case 'ADD_TABLE':
      featuresToUpdate = store.features.concat(action.tableFeature)
      return { ...store, features: featuresToUpdate }

    case 'REMOVE_TABLE':
      featuresToUpdate = store.features.filter(table => table.properties.id !== action.id)
      return { ...store, features: featuresToUpdate }

    case 'LIKE_TABLE':
    case 'UNLIKE_TABLE':
      featuresToUpdate = store.features.map(table =>
        table.properties.id !== action.id ? table : { ...table, properties: { ...table.properties, likes: action.likes } })
      return { ...store, features: featuresToUpdate }

    default:
      return store
  }
}

export const tablesInitialization = () => {
  return async (dispatch) => {
    try {
      const snapshot = await database.ref('tables').once('value')
      const dbTables = snapshot.val()
      const features = Object.values(dbTables)
      const tablescollection = {
        type: 'FeatureCollection',
        features: features
      }
      dispatch({ type: 'INIT_TABLES', tables: tablescollection })
    } catch (error) {
      console.log('Error: ', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't load tables" }, 7))
    }
  }
}



export const addTable = (props) => {
  return async (dispatch) => {
    const tableFeature = createGeoJSON(props)
    const geometry = { coordinates: [props.location.lngLat.lng, props.location.lngLat.lat] }

    try {
      const ref = await database.ref('/tables').push(tableFeature)
      database.ref(`/tables/${ref.key}/properties/id`).set(ref.key)
      tableFeature.properties.id = ref.key
      dispatch({ type: 'ADD_TABLE', tableFeature })
      dispatch(showNotification({ type: 'success', text: 'New table added to database' }, 4))
      dispatch(selectTable(tableFeature))
      dispatch(zoomToFeature(geometry, 16))
    } catch (error) {
      dispatch(showNotification({ type: 'alert', text: "Couldn't add table" }, 6))
      console.log('Error: ', error)
    }
  }
}

export const removeTable = (table, e) => {
  return async (dispatch) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const ok = window.confirm(`Remove table: ${table.properties.title} ?`)
    if (ok === false) return

    try {
      await database.ref('tables').child(table.properties.id).remove()
      dispatch({ type: 'REMOVE_TABLE', id: table.properties.id })
      dispatch(showNotification({ type: 'success', text: 'Table removed' }, 4))
    } catch (error) {
      dispatch(showNotification({ type: 'alert', text: "Couldn't remove table" }, 6))
      console.log('Error: ', error)
    }
  }
}


export const toggleLikeTable = (table, loggedInUser, e) => {
  return async (dispatch) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const id = table.properties.id
    const tableLikesDB = database.ref(`/tables/${id}/properties/likes`)
    const userLikesDB = database.ref(`/users/${loggedInUser.id}/likes`)
    const likedBefore = loggedInUser.likes !== null && loggedInUser.likes.indexOf(id) !== -1

    try {
      const tableLikesRef = await tableLikesDB.once('value')
      let tableLikes = tableLikesRef.val()
      // const userLikesRef = await userLikesDB.once('value')
      let userLikes = loggedInUser.likes

      if (likedBefore) {
        userLikes = userLikes !== null ? userLikes.filter(tableid => tableid !== id) : []
        dispatch({ type: 'UNLIKE_TABLE', id, likes: tableLikes - 1, uid: loggedInUser.id, userLikes })
        tableLikesDB.set(tableLikes - 1)
        userLikesDB.set(userLikes)
      } else {
        userLikes ? userLikes.push(id) : userLikes = [id]
        dispatch({ type: 'LIKE_TABLE', id, likes: tableLikes + 1, uid: loggedInUser.id, userLikes })
        tableLikesDB.set(tableLikes + 1)
        userLikesDB.set(userLikes)
      }

    } catch (error) {
      console.log('Error: ', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't like table" }, 6))
    }
  }
}



export default tablesReducer

