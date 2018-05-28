
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'


const initialMapPopups = { featurePopup: null, selectLocationPopup: null }
let mbPopup
let mapRef


const mapPopupReducer = (store = initialMapPopups, action) => {
  let feature = null

  switch (action.type) {
    case 'SET_FEATURE_POPUP':
      return { ...initialMapPopups, featurePopup: action.feature }

    case 'SET_SELECTLOC_POPUP':
      return { ...initialMapPopups, selectLocationPopup: action.feature }

    case 'LIKE_FEATURE':
    case 'UNLIKE_FEATURE':
      feature = store.featurePopup
      if (feature && feature.properties.id === action.id) {
        feature.properties.likes = action.likes
      }
      return { ...initialMapPopups, featurePopup: feature }

    case 'CLOSE_POPUP':
      return initialMapPopups

    default:
      return store
  }
}


export const setMapFeaturePopup = (feature, offset) => {
  return async (dispatch) => {
    if (mbPopup) {
      mbPopup.remove()
      dispatch({ type: 'CLOSE_POPUP' })
    }

    const coordinates = feature.geometry.coordinates.slice()
    const selectLocationPopup = feature.properties ? false : true

    selectLocationPopup
      ? mbPopup = new MapboxGl.Popup({ closeOnClick: true, closeButton: false, offset: offset, anchor: 'top' })
      : mbPopup = new MapboxGl.Popup({ closeOnClick: true, closeButton: true, offset: 3 })

    mbPopup
      .setLngLat(coordinates)
      .setHTML('<div id="popup" </div>')
      .addTo(mapRef)

    selectLocationPopup
      ? dispatch({ type: 'SET_SELECTLOC_POPUP', feature })
      : dispatch({ type: 'SET_FEATURE_POPUP', feature })
  }
}

export const closePopup = () => {
  return async (dispatch) => {
    if (mbPopup) mbPopup.remove()
  }
}

export const setMapReferenceForPopups = (map) => {
  if (!mapRef) mapRef = map
}




export default mapPopupReducer
