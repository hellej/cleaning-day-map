


export const getUniqueFeatures = (array, comparatorProperty) => {
  var existingFeatureKeys = {}
  // Because features come from tiled vector data, feature geometries may be split
  // or duplicated across tile boundaries and, as a result, features may appear
  // multiple times in query results.
  var uniqueFeatures = array.filter(function (el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true
    }
  })
  return uniqueFeatures
}