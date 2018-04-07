import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import mapFilteredTablesReducer from './reducers/mapFilteredTablesReducer'
import textFilteredTablesReducer from './reducers/textFilteredTablesReducer'
import tablesReducer from './reducers/tablesReducer'
import filterReducer from './reducers/filterReducer'
import mapControlReducer from './reducers/mapControlReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  tables: tablesReducer,
  mapFiltTables: mapFilteredTablesReducer,
  textFiltTables: textFilteredTablesReducer,
  filter: filterReducer,
  mapControl: mapControlReducer
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store