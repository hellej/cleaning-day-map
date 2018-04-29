
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyC_C8QgIru9JB5oyN9OIxwwOmNdxJ5pFEk',
  authDomain: 'cleaningdaymap.firebaseapp.com',
  databaseURL: 'https://cleaningdaymap.firebaseio.com',
  projectId: 'cleaningdaymap',
  storageBucket: '',
  messagingSenderId: '1070116075880'
}

let fire

if (!firebase.apps.length) {
  fire = firebase.initializeApp(config)
}

export const auth = firebase.auth()

export const database = fire.database()

