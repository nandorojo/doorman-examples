import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthGate } from 'react-native-doorman'
import OnboardingStack from './Onboarding-Stack'
import App from './App'

const Navigation = () => {
  const { loading, user } = useAuthGate()

  if (loading) return null

  return (
    <NavigationContainer>
      {!user ? <OnboardingStack /> : <App />}
    </NavigationContainer>
  )
}

export default Navigation
