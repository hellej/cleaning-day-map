import { tables } from './../tables'


const initialTables = tables.features


const mapFilteredTablesReducer = (store = initialTables, action) => {

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables

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

