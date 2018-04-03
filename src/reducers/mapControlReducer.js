
const initialControl = { center: [null, null], zoom: null }

const mapControlReducer = (store = initialControl, action) => {

  switch (action.type) {
    case 'ZOOM_TO':
      console.log('ACTION: ', action)
      return { center: action.center, zoom: action.zoom }

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

export default mapControlReducer
