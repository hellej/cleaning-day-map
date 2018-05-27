
import { LngLat } from 'mapbox-gl'


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
      description: props.description,
      id: props.id ? props.id : '',
      image: '',
      likes: props.likes ? props.likes : 0,
      openhours: props.openhours,
      phonenum: props.phonenum,
      title: props.title,
      user: props.user
    }
  }

  return geojson
}