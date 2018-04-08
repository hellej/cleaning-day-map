
import React from 'react'
import ReactDOM from 'react-dom'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

import Popup from './Popup'



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

export const getRenderedFeaturesFromQuery = (map) => {
  const tablefeatures = map.queryRenderedFeatures({ layers: ['tables'] })
  return getUniqueFeatures(tablefeatures, 'title')
}



let popupObj = null

export const renderPopup = (e, map) => {

  if (popupObj) { popupObj.remove() }

  const table = e.features[0]
  var coordinates = table.geometry.coordinates.slice()
  const popup = `<div id="popup"> </div>`

  popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: false })

  popupObj
    .setLngLat(coordinates)
    .setHTML(popup)
    .addTo(map)

  ReactDOM.render(<Popup table={table} />, document.getElementById('popup'))
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