import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import MapApp from './MapApp'



import tableReducer from './reducers/tableReducer'

const reducer = combineReducers({
  tables: tableReducer
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




