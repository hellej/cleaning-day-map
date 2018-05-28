import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

const initialControl = {
  center: null,
  zoom: null,
  selectedFeature: null,
  mouseOnFeature: null,
  mapLoaded: false,
  layerLoaded: false,
  reloadFeatures: []
}

const mapControlReducer = (store = initialControl, action) => {
  let selectedFeature, center = null

  switch (action.type) {
    case 'SET_ZOOM_TO':
      if (action.center) { center = new MapboxGl.LngLat(action.center[0], action.center[1]) }
      return { ...store, center, zoom: action.zoom }

    case 'RESET_CAMERA':
      return { ...initialControl, selectedFeature: store.selectedFeature }

    case 'SET_CAMERA':
      return { ...store, center: action.camera.center, zoom: action.camera.zoom }

    case 'TOGGLE_SELECTION':
      if (store.selectedFeature === action.id) {
        selectedFeature = null
      } else selectedFeature = action.id
      return { ...store, selectedFeature }

    case 'UNSELECT_FEATURE':
      return { ...store, selectedFeature: null }

    case 'MOUSEON_FEATURE':
      return { ...store, mouseOnFeature: action.feature.properties.id }

    case 'MOUSEOUT_FEATURE':
      return { ...store, mouseOnFeature: null, selectedFeature: null }

    case 'SET_MAP_LOADED':
      return { ...store, mapLoaded: true }

    case 'SET_LAYER_LOADED':
      return { ...store, layerLoaded: true }

    case 'UPDATE_FEATURE':
    case 'LIKE_FEATURE':
    case 'UNLIKE_FEATURE':
      return { ...store, reloadFeatures: store.reloadFeatures.concat(action.id) }

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

export const selectFeature = (feature, e) => {
  if (e) e.stopPropagation()
  const id = feature.properties ? feature.properties.id : feature.id
  return { type: 'TOGGLE_SELECTION', id }
}

export const unselectFeature = (e) => {
  return async (dispatch) => {
    dispatch({ type: 'UNSELECT_FEATURE' })
  }
}

export const mouseOnFeature = (feature) => {
  return { type: 'MOUSEON_FEATURE', feature }
}

export const mouseOutFeature = () => {
  return { type: 'MOUSEOUT_FEATURE' }
}

export const setMapLoaded = () => {
  return { type: 'SET_MAP_LOADED' }
}

export const setLayerLoaded = () => {
  return { type: 'SET_LAYER_LOADED' }
}

export default mapControlReducer
