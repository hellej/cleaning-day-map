
const initialTables = []

const mapFilteredTablesReducer = (store = initialTables, action) => {

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables.features.map(feature => feature.properties.id)

    case 'SET_MAP_FILT_TABLES':
      return action.tables.map(table => table.properties.id)

    case 'ADD_TABLE':
      return store.concat(action.tableFeature.properties.id)

    case 'REMOVE_TABLE':
      return store.filter(id => id !== action.id)

    default:
      return store
  }
}


export const setMapFiltTablesList = (tables) => {
  return { type: 'SET_MAP_FILT_TABLES', tables }
}


export default mapFilteredTablesReducer

