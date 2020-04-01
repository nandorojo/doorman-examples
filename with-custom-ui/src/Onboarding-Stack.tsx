import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PhoneScreen from './Phone-Screen'
import ConfirmScreen from './Confirm-Screen'

const Stack = createStackNavigator()

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
      <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
    </Stack.Navigator>
  )
}

export default OnboardingStack
