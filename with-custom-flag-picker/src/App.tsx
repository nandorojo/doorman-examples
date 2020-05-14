import React from 'react'
import { DoormanProvider, AuthGate } from 'react-native-doorman'
import AuthWithCustomCountryPicker from './Auth-Custom-Country-Picker'
import AfterAuth from './After-Auth'

const DOORMAN_PUBLIC_PROJECT_ID = 'djzlPQFxxzJikNQgLwxN'

const App = () => {
  return (
    <DoormanProvider publicProjectId={DOORMAN_PUBLIC_PROJECT_ID}>
      <AuthGate>
        {({ loading, user }) => {
          if (loading) return <></>

          if (!user) return <AuthWithCustomCountryPicker />

          return <AfterAuth />
        }}
      </AuthGate>
    </DoormanProvider>
  )
}
export default App
