import AuthLogic from './src/AuthLogic'

/**
 * IF YOU'RE USING FIRESTORE, LEAVE THIS IMPORT.
 *
 * 🔥 open ./src/db to enter your own firebase config!
 */
import './src/db'

/**
 * IF YOU ARE NOT USING FIRESTORE, DELETE THE IMPORT ABOVE, AND UNCOMMENT THE CODE BELOW:
 */

// import * as firebase from 'firebase'
// import 'firebase/auth'
// if (!firebase.apps.length) {
//   // you can replace this with your firebase config
//   firebase.initializeApp(firebaseConfig)
// }

export default AuthLogic
