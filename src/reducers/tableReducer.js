import { tables } from './../tables'


const initialTables = tables.features


const tableReducer = (store = initialTables, action) => {

  switch (action.type) {
    case 'INIT_TABLES':
      return action.tables

    case 'SET_TABLES':
      return action.tables

    // case 'LIKE_TABLE':
    //   const old = store.filter(b => b.id !== action.id)
    //   const liked = store.find(b => b.id === action.id)
    //   return [...old, { ...liked, likes: liked.likes + 1 }]

    // case 'DELETE_TABLE':
    //   return store.filter(b => b.id !== action.id)

    // case 'CREATE_TABLE':
    //   return store.concat(action.blog)

    default:
      return store
  }
}



export const tablesInitialization = (tables) => {
  return { type: 'INIT_TABLES', tables }
}

export const setTablesList = (tables) => {
  return { type: 'SET_TABLES', tables }
}


export default tableReducer

