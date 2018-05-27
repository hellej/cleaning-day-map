import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
import MapFeaturePopup from './components/maplayers/MapFeaturePopup'
import SelectLocationPopup from './components/maplayers/SelectLocationPopup'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
  const popupElement = document.getElementById('popup')
  if (popupElement) {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <MapFeaturePopup />
          <SelectLocationPopup />
        </div>
      </Provider>,
      popupElement
    )
  }
}

render()
store.subscribe(render)




