
import React from 'react'
import ReactDOM from 'react-dom'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { LngLat } from 'mapbox-gl'

import Popup from './maplayers/Popup'
import PopupNewTable from './maplayers/PopupNewTable'



export const getUniqueFeatures = (array, comparatorProperty) => {
  var existingFeatureKeys = {}
  var uniqueFeatures = array.filter(function (el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true
      return true
    }
  })
  return uniqueFeatures
}

export const getRenderedFeaturesFromQuery = (map, id) => {
  const layerfeatures = map.queryRenderedFeatures({ layers: [id] })
  return getUniqueFeatures(layerfeatures, 'title')
}



let popupObj = null

export const removePopup = () => {
  if (popupObj) { popupObj.remove() }
}

export const renderPopup = (feature, map, offset, history) => {
  removePopup()

  const coordinates = feature.geometry.coordinates.slice()
  const newtablepopup = feature.properties ? false : true

  newtablepopup ?
    popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: false, offset: offset, anchor: 'top' })
    : popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: true, offset: offset })

  popupObj
    .setLngLat(coordinates)
    .setHTML('<div id="popup" </div>')
    .addTo(map)

  popupObj.on('close', function (e) {
  })

  newtablepopup ?
    ReactDOM.render(<PopupNewTable newtable={feature} history={history} />, document.getElementById('popup'))
    : ReactDOM.render(<Popup table={feature} />, document.getElementById('popup'))
}


export const equalCenter = (camera1, camera2) => {
  return (camera1.center.lng.toFixed(3) === camera2.center.lng.toFixed(3) && camera1.zoom === camera2.zoom)
}


export const getLngLatFromGeometry = (geometry) => {
  return new LngLat(geometry.coordinates[0], geometry.coordinates[1])
}

export const createGeoJSON = (props) => {

  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [Number(props.location.lngLat.lng), Number(props.location.lngLat.lat)]
    },
    properties: {
      title: props.title,
      description: props.description,
      phonenum: props.phonenum,
      openhours: props.openhours,
      image: 'url?',
      likes: 0,
      user: props.user
    }
  }

  return geojson
}