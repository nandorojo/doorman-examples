import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  // you can replace this with your firebase config
  // If you do, make sure to change the publicProjectId in src/App
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
console.warn = () => null

console.disableYellowBox = true

export { default } from './src/App'
