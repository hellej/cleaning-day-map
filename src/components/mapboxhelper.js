
import React from 'react'
import ReactDOM from 'react-dom'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

import Popup from './Popup'
import PopupNewTable from './PopupNewTable'



export const getUniqueFeatures = (array, comparatorProperty) => {
  var existingFeatureKeys = {}
  var uniqueFeatures = array.filter(function (el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true
    }
  })
  return uniqueFeatures
}

export const getRenderedFeaturesFromQuery = (map, id) => {
  const tablefeatures = map.queryRenderedFeatures({ layers: [id] })
  return getUniqueFeatures(tablefeatures, 'title')
}



let popupObj = null

export const renderPopup = (feature, map, offset) => {

  if (popupObj) { popupObj.remove() }

  const coordinates = feature.geometry.coordinates.slice()
  const newtablepopup = feature.properties ? false : true

  const popup = `<div id="popup" </div>`

  newtablepopup ?
    popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: false, offset: offset, anchor: 'top' })
    : popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: true, offset: offset })

  popupObj
    .setLngLat(coordinates)
    .setHTML(popup)
    .addTo(map)

  newtablepopup ?
    ReactDOM.render(<PopupNewTable newtable={feature} />, document.getElementById('popup'))
    : ReactDOM.render(<Popup table={feature} />, document.getElementById('popup'))
}

export const removePopup = () => {
  if (popupObj) { popupObj.remove() }
}

export const equalCenter = (camera1, camera2) => {
  return (camera1.center.lng.toFixed(3) === camera2.center.lng.toFixed(3) && camera1.zoom === camera2.zoom)
}



// export const createGeoJSONarray = (tables) => {

//   let geojsontables = {
//     "type": "FeatureCollection",
//     "features": []
//   }
// }


export const createGeoJSON = (table) => {

  const geojson = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [24.9698, 60.2178]
    },
    "properties": {
      "title": "Vaatteita ja kenkiä",
      "description": "Paljon erilaisia 6-10 v lasten pieneksi jääneitä vaatteita",
      "openhours": "10-14",
      "phonenum": "0452342344",
      "image": "url?",
      "likes": 2
    }
  }
  return geojson

}