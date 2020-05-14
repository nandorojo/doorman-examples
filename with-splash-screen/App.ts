import * as firebase from 'firebase'
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

export { default } from './src'
