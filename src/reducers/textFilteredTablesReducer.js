
const initialFeatures = []

const textFilteredTablesReducer = (store = initialFeatures, action) => {

  let featuresToUpdate

  switch (action.type) {

    case 'INIT_FEATURES':
      return action.featureCollection.features

    case 'SET_FILTER':
      return filterFeatures(action.features, action.filter)

    case 'ADD_FEATURE':
      return store.concat(action.newFeature)

    case 'REMOVE_FEATURE':
      return store.filter(feature => feature.properties.id !== action.id)

    case 'LIKE_FEATURE':
    case 'UNLIKE_FEATURE':
      featuresToUpdate = store.map(feature =>
        feature.properties.id !== action.id
          ? feature
          : { ...feature, properties: { ...feature.properties, likes: action.likes } })
      return featuresToUpdate

    default:
      return store
  }
}

const filterFeatures = (features, filter) => {
  return features.filter(feature => (feature.properties.description.concat(feature.properties.title).toLowerCase()
    .includes(filter.toLowerCase())))
}

export default textFilteredTablesReducer

