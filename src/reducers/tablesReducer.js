// import { tables } from './../tables'
import { createGeoJSON } from './../components/mapboxhelper'
import { database } from './../firebase/index'
import { showNotification } from './notificationReducer'



// let tablesRef = database.ref('tables').orderByKey().limitToLast(100)
// console.log('tablesref in firebase: ', tablesRef)
// for (let i = 0; i <= tables.length; i++) {
//   database.ref('tables').push(tables[i])
// }


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

    default:
      return store
  }
}

export const tablesInitialization = () => {
  return async (dispatch) => {
    try {
      const snapshot = await database.ref('tables').once('value')
      const tables = snapshot.val()
      const ids = Object.keys(tables)
      const features = Object.values(tables)

      const featuresids = features.map((feature, index) => {
        feature.properties.id = ids[index]
        return feature
      })
      const tablescollection = {
        type: 'FeatureCollection',
        features: featuresids
      }
      dispatch({ type: 'INIT_TABLES', tables: tablescollection })
    } catch (error) {
      console.log('Error: ', error)
      dispatch(showNotification({ type: 'alert', text: "Couldn't initialize tables" }, 7))
    }
  }
}



export const addTable = (form) => {
  return (dispatch) => {
    const tableFeature = createGeoJSON(form)
    database.ref('tables').push(tableFeature)
      .then((ref) => {
        tableFeature.properties.id = ref.key
        dispatch({ type: 'ADD_TABLE', tableFeature })
        dispatch(showNotification({ type: 'success', text: 'New table added to database' }, 4))
      })
      .catch((error) => {
        dispatch(showNotification({ type: 'alert', text: "Couldn't connect to database" }, 7))
        console.log('Error: ', error)
      })
  }
}


export default tablesReducer

