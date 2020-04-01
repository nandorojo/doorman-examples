import React from 'react'
import { DoormanProvider } from 'react-native-doorman'
import Navigation from './src/Navigation'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // if you're using firestore

if (!firebase.apps.length) {
  firebase.initializeApp({
    // you can replace with your firebase config
    apiKey: 'AIzaSyCn8HyP1tVZiagk-YvZRwjSwKdwQw5Pvng',
    authDomain: 'tester-9d8bb.firebaseapp.com',
    databaseURL: 'https://tester-9d8bb.firebaseio.com',
    projectId: 'tester-9d8bb',
    storageBucket: 'tester-9d8bb.appspot.com',
    messagingSenderId: '760778283392',
    appId: '1:760778283392:web:05cb35d0837c93c6584965'
  })
}

const App = () => {
  return (
    <DoormanProvider publicProjectId="djzlPQFxxzJikNQgLwxN">
      <Navigation />
    </DoormanProvider>
  )
}

export default App
