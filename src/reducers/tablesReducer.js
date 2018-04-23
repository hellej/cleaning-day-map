import { tables } from './../tables'
import { createGeoJSON } from './../components/mapboxhelper'

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


export const addTable = (form) => {
  const tableFeature = createGeoJSON(form)
  return (dispatch) => {
    dispatch({ type: 'ADD_TABLE', tableFeature })
  }
}

export const tablesInitialization = () => {
  const tablescollection = {
    type: 'FeatureCollection',
    features: tables
  }
  return async (dispatch) => {
    dispatch({ type: 'INIT_TABLES', tables: tablescollection })
  }
}

export default tablesReducer

