import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

const initialControl = { center: null, zoom: null, selectedtable: null }

const mapControlReducer = (store = initialControl, action) => {

  switch (action.type) {
    case 'ZOOM_TO':
      console.log('ACTION: ', action)
      const latlong = new MapboxGl.LngLat(action.center[0], action.center[1])
      return { center: latlong, zoom: action.zoom }

    case 'RESET_CAMERA':
      return { ...initialControl, selectedtable: store.selectedtable }

    case 'SET_CAMERA':
      return { ...store, center: action.camera.center, zoom: action.camera.zoom }

    case 'SELECT_TABLE':
      console.log('action: ', action)
      return { ...store, selectedtable: action.table.properties.title }

    case 'UNSELECT_TABLE':
      console.log('action: ', action)
      return { ...store, selectedtable: null }

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

export const setCamera = (camera) => {
  return {
    type: 'SET_CAMERA', camera
  }
}

export const resetCamera = (feature) => {
  return {
    type: 'RESET_CAMERA'
  }
}

export const selectTable = (table) => {
  console.log('select table: ', table)
  return { type: 'SELECT_TABLE', table }
}

export const unselectTable = () => {
  return { type: 'UNSELECT_TABLE' }
}


export default mapControlReducer
