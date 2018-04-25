import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

const initialControl = { center: null, zoom: null, selectedtable: null, mouseontable: null }

const mapControlReducer = (store = initialControl, action) => {
  let selectedtable, center = null

  switch (action.type) {
    case 'SET_ZOOM_TO':
      if (action.center) { center = new MapboxGl.LngLat(action.center[0], action.center[1]) }
      return { ...store, center, zoom: action.zoom }

    case 'RESET_CAMERA':
      return { ...initialControl, selectedtable: store.selectedtable }

    case 'SET_CAMERA':
      return { ...store, center: action.camera.center, zoom: action.camera.zoom }

    case 'TOGGLE_SELECTION':
      if (store.selectedtable === action.title) {
        selectedtable = null
      } else selectedtable = action.title
      return { ...store, selectedtable }

    case 'UNSELECT_TABLE':
      return { ...store, selectedtable: null }

    case 'MOUSEON_TABLE':
      return { ...store, mouseontable: action.table.properties.title }

    case 'MOUSEOUT_TABLE':
      return { ...store, mouseontable: null }

    default:
      return store
  }
}

export const zoomToFeature = (geometry, zoom, e) => {
  return async (dispatch) => {
    e.stopPropagation()
    const zoomTo = zoom ? zoom : 13

    dispatch({
      type: 'SET_ZOOM_TO',
      center: [geometry.coordinates[0], geometry.coordinates[1]],
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
  const title = tableprops.properties ? tableprops.properties.title : tableprops.title
  return { type: 'TOGGLE_SELECTION', title }
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

export default mapControlReducer
