
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'


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


export const setPopup = (e, map) => {

  const table = e.features[0]
  var coordinates = table.geometry.coordinates.slice();

  const popup = `
      <div onClick=(console.log("popup clicked"))>
      <div class="popupTitle"> ${table.properties.title} </div>
        ${table.properties.description}
      </div>
    `
  new MapboxGl.Popup({ closeOnClick: true })
    .setLngLat(coordinates)
    .setHTML(popup)
    .addTo(map)
}