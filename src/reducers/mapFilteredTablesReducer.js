
const initialFeatures = []

const mapFilteredTablesReducer = (store = initialFeatures, action) => {

  switch (action.type) {
    case 'INIT_FEATURES':
      return action.featureCollection.features.map(feature => feature.properties.id)

    case 'SET_MAP_FILT_FEATURES':
      return action.features.map(feature => feature.properties.id)

    case 'ADD_FEATURE':
      return store.concat(action.newFeature.properties.id)

    case 'REMOVE_FEATURE':
      return store.filter(id => id !== action.id)

    default:
      return store
  }
}


export const setMapFilteredFeatures = (features) => {
  return { type: 'SET_MAP_FILT_FEATURES', features }
}


export default mapFilteredTablesReducer

