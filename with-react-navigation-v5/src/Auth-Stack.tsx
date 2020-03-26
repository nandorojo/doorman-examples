import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Splash, Phone, Confirm } from './Auth-Screens'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export const Auth = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTransparent: true,
					headerTintColor: 'white',
				}}
			>
				<Stack.Screen name="Splash" component={Splash} />
				<Stack.Screen name="Phone" component={Phone} />
				<Stack.Screen name="Confirm" component={Confirm} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
