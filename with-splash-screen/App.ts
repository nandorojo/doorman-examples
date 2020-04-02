import { withPhoneAuth } from 'react-native-doorman'

import App from './src/App'
import SplashScreen from './src/Splash-Screen'

import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  // you can replace this with your firebase config
  firebase.initializeApp({
    apiKey: 'AIzaSyCn8HyP1tVZiagk-YvZRwjSwKdwQw5Pvng',
    authDomain: 'tester-9d8bb.firebaseapp.com',
    databaseURL: 'https://tester-9d8bb.firebaseio.com',
    projectId: 'tester-9d8bb',
    storageBucket: 'tester-9d8bb.appspot.com',
    messagingSenderId: '760778283392',
    appId: '1:760778283392:web:05cb35d0837c93c6584965',
  })
}

export default withPhoneAuth(App, {
  doorman: {
    // you can replace this with your publicProjectId from https://doorman.cool
    publicProjectId: 'djzlPQFxxzJikNQgLwxN',
  },

  SplashScreen, // <-- add a splash screen
  // other customizations 👇
  onAuthStateChanged: user => {
    if (user) {
      // if user is signed in...
    } else {
      // if user is not signed in...
    }
  },
  initialPhoneNumber: '+1',
})
