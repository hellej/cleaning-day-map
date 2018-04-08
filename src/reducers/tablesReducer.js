import { tables } from './../tables'


const initialTables = tables


const tablesReducer = (store = initialTables, action) => {

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables

    case 'SET_TABLES':
      return action.tables



    default:
      return store
  }
}




export default tablesReducer

