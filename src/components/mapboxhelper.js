
import React from 'react'
import ReactDOM from 'react-dom'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { LngLat } from 'mapbox-gl'

import Popup from './maplayers/Popup'
import PopupSelectLocation from './maplayers/PopupSelectLocation'



export const getUniqueFeatures = (array, comparatorProperty) => {
  var existingFeatureKeys = {}
  var uniqueFeatures = array.filter((el) => {
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
  return getUniqueFeatures(layerfeatures, 'id')
}



let popupObj = null

export const removePopup = () => {
  if (popupObj) { popupObj.remove() }
}

export const renderPopup = (feature, map, offset, history) => {
  removePopup()

  const coordinates = feature.geometry.coordinates.slice()
  const newFeaturePopup = feature.properties ? false : true

  newFeaturePopup ?
    popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: false, offset: offset, anchor: 'top' })
    : popupObj = new MapboxGl.Popup({ closeOnClick: true, closeButton: true, offset: offset })

  popupObj
    .setLngLat(coordinates)
    .setHTML('<div id="popup" </div>')
    .addTo(map)

  popupObj.on('close', function (e) {
  })

  newFeaturePopup ?
    ReactDOM.render(<PopupSelectLocation history={history} />, document.getElementById('popup'))
    : ReactDOM.render(<Popup feature={feature} />, document.getElementById('popup'))
}


export const equalCenter = (camera1, camera2) => {
  return (camera1.center.lng.toFixed(3) === camera2.center.lng.toFixed(3) && camera1.zoom === camera2.zoom)
}


export const getLngLatFromGeometry = (geometry) => {
  return new LngLat(geometry.coordinates[0], geometry.coordinates[1])
}

export const getLngLatFromLngLat = (lngLat) => {
  return new LngLat(lngLat.lng, lngLat.lat)
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