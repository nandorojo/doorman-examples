import AuthLogic from './src/AuthLogic'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore' // <- if you use Firestore
import { firebaseConfig } from './src/db'

if (!firebase.apps.length) {
  // you can replace this with your firebase config
  firebase.initializeApp(firebaseConfig)
}

export default AuthLogic
