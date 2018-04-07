import { createStore, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'


import mapFilteredTablesReducer from './reducers/mapFilteredTablesReducer'
import textFilteredTablesReducer from './reducers/textFilteredTablesReducer'
import tablesReducer from './reducers/tablesReducer'
import filterReducer from './reducers/filterReducer'
import mapControlReducer from './reducers/mapControlReducer'



const reducer = combineReducers({
  tables: tablesReducer,
  mapFiltTables: mapFilteredTablesReducer,
  textFiltTables: textFilteredTablesReducer,
  filter: filterReducer,
  mapControl: mapControlReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store