
import { db } from './../firebase'
import { createGeoJSON } from '../../components/mapboxhelper'


export const onceGetAll = async () => {
  const snapshot = await db.ref('tables').once('value')
  const features = Object.values(snapshot.val())
  return features
}

export const onceGetAllAsCollection = async () => {
  const features = await onceGetAll()
  const featureCollection = {
    type: 'FeatureCollection',
    features: features
  }
  return featureCollection
}

export const addFeature = async (feature, loggedInUser) => {
  const ref = await db.ref('/tables').push(feature)
  db.ref(`/tables/${ref.key}/properties/id`).set(ref.key)
  feature.properties.id = ref.key
  const userTablesRef = await db.ref(`/users/${loggedInUser.id}/tables`).once('value')
  const userTables = userTablesRef.val() ? userTablesRef.val().concat(ref.key) : [ref.key]
  db.ref(`/users/${loggedInUser.id}/tables`).set(userTables)
  return ref.key
}

export const updateFeature = async (props) => {
  const id = props.id
  const featureLikesRef = await db.ref(`/tables/${id}/properties/likes`).once('value')
  props.likes = featureLikesRef.val() ? featureLikesRef.val() : props.likes
  const editedFeature = createGeoJSON(props)
  console.log('editedFeature', editedFeature)
  await db.ref(`/tables/${id}`).set(editedFeature)
  return editedFeature
}

export const removeFeature = async (id, loggedInUser) => {
  await db.ref('tables').child(id).remove()
  const userTablesRef = await db.ref(`/users/${loggedInUser.id}/tables`).once('value')
  let userTables = userTablesRef.val() ? userTablesRef.val() : []
  userTables = userTables.filter(featureId => featureId !== id)
  await db.ref(`/users/${loggedInUser.id}/tables`).set(userTables)
}

export const toggleLikeFeature = async (feature, loggedInUser) => {
  const id = feature.properties.id
  const tableLikesDB = db.ref(`/tables/${id}/properties/likes`)
  const userLikesDB = db.ref(`/users/${loggedInUser.id}/likes`)
  const likedBefore = loggedInUser.likes !== null && loggedInUser.likes.indexOf(id) !== -1

  const tableLikesRef = await tableLikesDB.once('value')
  let tableLikes = tableLikesRef.val()
  let userLikes = loggedInUser.likes

  if (likedBefore) {
    userLikes = userLikes !== null ? userLikes.filter(tableid => tableid !== id) : []
    tableLikesDB.set(tableLikes - 1)
    userLikesDB.set(userLikes)
    return { likedBefore: true, tableLikes: tableLikes - 1, userLikes }
  } else {
    userLikes ? userLikes.push(id) : userLikes = [id]
    tableLikesDB.set(tableLikes + 1)
    userLikesDB.set(userLikes)
    return { likedBefore: false, tableLikes: tableLikes + 1, userLikes }
  }
}

