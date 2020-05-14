import { withPhoneAuth } from 'react-native-doorman'

import App from './After-Auth'
import SplashScreen from './Splash-Screen'

export default withPhoneAuth(App, {
  doorman: {
    // you can replace this with your publicProjectId from https://app.doorman.cool
    publicProjectId: 'djzlPQFxxzJikNQgLwxN',
  },

  SplashScreen, // <-- add a splash screen

  // other optional customizations 👇
  onAuthStateChanged: user => {
    if (user) {
      // if user is signed in...
    } else {
      // if user is not signed in...
    }
  },
  initialPhoneNumber: '+1',
  backgroundColor: ['blue', 'green'],
})
