
const initialTables = []

const mapFilteredTablesReducer = (store = initialTables, action) => {

  let featuresToUpdate

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables.features

    case 'SET_MAP_FILT_TABLES':
      return action.tables

    case 'ADD_TABLE':
      featuresToUpdate = store.concat(action.tableFeature)
      return featuresToUpdate

    case 'REMOVE_TABLE':
      featuresToUpdate = store.filter(table => table.properties.id !== action.id)
      return featuresToUpdate

    default:
      return store
  }
}


export const setMapFiltTablesList = (tables) => {
  return { type: 'SET_MAP_FILT_TABLES', tables }
}


export default mapFilteredTablesReducer

