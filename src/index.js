import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import MapApp from './MapApp'


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


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MapApp />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)




