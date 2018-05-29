
import firebase from 'firebase'
import { config } from './config'


if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()

export const db = firebase.database()

