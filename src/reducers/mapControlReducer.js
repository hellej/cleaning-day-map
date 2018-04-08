import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

const initialControl = null

const mapControlReducer = (store = initialControl, action) => {

  switch (action.type) {
    case 'ZOOM_TO':
      console.log('ACTION: ', action)
      const latlong = new MapboxGl.LngLat(action.center[0], action.center[1])
      return { center: latlong, zoom: action.zoom }
    case 'RESET_MAPCONTROL':
      return null

    default:
      return store
  }
}


export const zoomToFeature = (feature) => {
  return {
    type: 'ZOOM_TO',
    center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
    zoom: 13
  }
}

export const resetMapControl = (feature) => {
  return {
    type: 'RESET_MAPCONTROL'
  }
}

export default mapControlReducer
