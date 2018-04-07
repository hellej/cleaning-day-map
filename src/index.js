import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import store from './store'

import MapApp from './MapApp'



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




