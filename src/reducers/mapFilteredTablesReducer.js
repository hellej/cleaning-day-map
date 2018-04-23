
const initialTables = []

const mapFilteredTablesReducer = (store = initialTables, action) => {

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables.features

    case 'SET_MAP_FILT_TABLES':
      return action.tables

    default:
      return store
  }
}


export const setMapFiltTablesList = (tables) => {
  return { type: 'SET_MAP_FILT_TABLES', tables }
}


export default mapFilteredTablesReducer

