import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
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




