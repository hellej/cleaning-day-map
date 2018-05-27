import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'


const initialMapPopups = { featurePopup: null, selectLocationPopup: null }
let mbPopup

const mapPopupReducer = (store = initialMapPopups, action) => {

  switch (action.type) {
    case 'SET_FEATURE_POPUP':
      return { ...initialMapPopups, featurePopup: action.feature }

    case 'SET_SELECTLOC_POPUP':
      return { ...initialMapPopups, selectLocationPopup: action.feature }

    case 'CLOSE_POPUP':
      return initialMapPopups

    default:
      return store
  }
}


export const setMapFeaturePopup = (feature, map, offset) => {
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
      .addTo(map)

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





export default mapPopupReducer
