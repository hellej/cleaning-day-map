import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

const initialControl = {
  center: null,
  zoom: null,
  selectedTable: null,
  mouseOnTable: null,
  mapLoaded: false,
  layerLoaded: false,
  reloadTables: []
}

const mapControlReducer = (store = initialControl, action) => {
  let selectedTable, center = null

  switch (action.type) {
    case 'SET_ZOOM_TO':
      if (action.center) { center = new MapboxGl.LngLat(action.center[0], action.center[1]) }
      return { ...store, center, zoom: action.zoom }

    case 'RESET_CAMERA':
      return { ...initialControl, selectedTable: store.selectedTable }

    case 'SET_CAMERA':
      return { ...store, center: action.camera.center, zoom: action.camera.zoom }

    case 'TOGGLE_SELECTION':
      if (store.selectedTable === action.id) {
        selectedTable = null
      } else selectedTable = action.id
      return { ...store, selectedTable }

    case 'UNSELECT_TABLE':
      return { ...store, selectedTable: null }

    case 'MOUSEON_TABLE':
      return { ...store, mouseOnTable: action.table.properties.id }

    case 'MOUSEOUT_TABLE':
      return { ...store, mouseOnTable: null }

    case 'SET_MAP_LOADED':
      return { ...store, mapLoaded: true }

    case 'SET_LAYER_LOADED':
      return { ...store, layerLoaded: true }

    case 'LIKE_TABLE':
    case 'UNLIKE_TABLE':
      return { ...store, reloadTables: store.reloadTables.concat(action.id) }

    default:
      return store
  }
}

export const zoomToFeature = (geometry, zoom, e) => {
  return async (dispatch) => {
    if (e) e.stopPropagation()
    const zoomTo = zoom ? zoom : 13
    let center

    geometry.lng
      ? center = [geometry.lng, geometry.lat]
      : center = [geometry.coordinates[0], geometry.coordinates[1]]

    dispatch({
      type: 'SET_ZOOM_TO',
      center,
      zoom: zoomTo
    })
    await new Promise(resolve => setTimeout(resolve, 200))
    dispatch({
      type: 'SET_ZOOM_TO',
      center: null,
      zoom: zoomTo
    })

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

export const selectTable = (tableprops) => {
  const id = tableprops.properties ? tableprops.properties.id : tableprops.id
  return { type: 'TOGGLE_SELECTION', id }
}

export const unselectTable = (e) => {
  return async (dispatch) => {
    dispatch({ type: 'UNSELECT_TABLE' })
  }
}

export const mouseOnTable = (table) => {
  return { type: 'MOUSEON_TABLE', table }
}

export const mouseOutTable = () => {
  return { type: 'MOUSEOUT_TABLE' }
}

export const setMapLoaded = () => {
  return { type: 'SET_MAP_LOADED' }
}

export const setLayerLoaded = () => {
  return { type: 'SET_LAYER_LOADED' }
}

export default mapControlReducer
