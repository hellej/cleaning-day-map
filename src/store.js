import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import mapFilteredTablesReducer from './reducers/mapFilteredTablesReducer'
import textFilteredTablesReducer from './reducers/textFilteredTablesReducer'
import tablesReducer from './reducers/tablesReducer'
import filterReducer from './reducers/filterReducer'
import mapControlReducer from './reducers/mapControlReducer'
import notificationReducer from './reducers/notificationReducer'
import tableFormReducer from './reducers/tableFormReducer'
import userStateReducer from './reducers/userReducer'
import mapPopupReducer from './reducers/mapPopupReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  tablesCollection: tablesReducer,
  mapFiltFeatures: mapFilteredTablesReducer,
  textFiltFeatures: textFilteredTablesReducer,
  filter: filterReducer,
  mapControl: mapControlReducer,
  tableform: tableFormReducer,
  userState: userStateReducer,
  mapPopup: mapPopupReducer
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store