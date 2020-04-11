# Doorman Custom UI Example

🚨 Typically, we recommend using Doorman's customizable UI components.

🤷‍♂️ That said, this example shows how to use Doorman phone auth with fully custom screens, instead of Doorman's UI.

🧐 **Doorman** is a sign-in-with-phone-number SDK that integrates with Firebase auth and Expo. [Learn more here](https://doorman.cool)

⬜️ I'll leave the UI of this example as bare as possible.

# Table of Contents

- TLDR
- Clone
- Full tutorial for this example

# TLDR

Initialize `firebase` in the root of your app.

Then make sure you wrap your root app with the `DoormanProvider` component, and pass your `publicProjectId` as a prop.

Finally – there are two main functions we will use: `doorman.signInWithPhoneNumber` and `doorman.verifyCode`. They look like this:

```es6
import { doorman } from 'react-native-doorman`

await doorman.signInWithPhoneNumber({
	phoneNumber: '+15555555555'
})
await doorman.verifyCode({
	phoneNumber: '+15555555555',
	code: '111111'
})
```

We will use `Expo`, `Doorman Phone Verification`, `Firebase auth`, and `React Navigation v5`.

# Clone example

```
git clone https://github.com/nandorojo/doorman-examples
cd with-custom-ui
yarn
expo start
```

# 📒 Tutorial

Alright, let's walk through this thing. 🥳

If you want to just see code, you'll find it in this repo, but I'll outline the steps below too!

## What you need

## 0. Installing dependencies

First, install Doorman, its dependencies, and firebase:

```sh
yarn add react-native-doorman firebase
expo install react-native-reanimated react-native-gesture-handler
```

Next, install React Navigation 5 and its dependencies:

```sh
yarn add @react-navigation/native @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## 1. Initialize Firebase & Doorman

Delete everything from `App.tsx` and replace it with this:

**`App.tsx`**

```jsx
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
```

Here, all we're doing is initializing our Firebase project. This must be done at the root of your app. You can replace the config with your own.

Next, let's add the `DoormanProvider` to the same file

**`App.tsx`**

```es6
import React from 'react'
import { DoormanProvider } from 'react-native-doorman'
import Navigation from './src/Navigation' // <-- we'll make this in the next step 🙃

// initialize firebase code here

const App = () => {
  return (
    <DoormanProvider publicProjectId="djzlPQFxxzJikNQgLwxN">
      <Navigation />
    </DoormanProvider>
  )
}

export default App
```

You can replace the `publicProjectId` with your own, found on the [Doorman dashboard](https://app.doorman.cool).

## 2. Create the "is authenticated" logic

There are two scenarios for our app: **1.** the user is logged in, or **2.** the user is not logged in.

The screen we render depends on this state.

Typically, we use Doorman's `AuthGate` component to handle this logic, but for this example, let's use the `useAuthGate` hook instead.

### Create a `src` folder and add a `Navigation.tsx` file

Our React Navigation logic goes in this screen.

**`src/Navigation`**

```jsx
import React from 'react'
import { useAuthGate } from 'react-native-doorman'
import { NavigationContainer } from '@react-navigation/native'

const Navigation = () => {
  const { loading, user } = useAuthGate()

  if (loading) return null

  return (
    <NavigationContainer>
      {/* we're going to render put our stacks here!*/}
    </NavigationContainer>
  )
}

export default Navigation
```

Now we have a starter file! Here's the situation we want: If the user is **not signed in**, we render an onboarding stack. If the user **is signed in**, show our normal app.

That's where the `useAuthGate` hook comes in. It automatically updates the state of the app when the auth state changes. If the user is signed in, then the `user` returned by `useAuthGate` is the firebase auth object.

It will look something like this:

```jsx
<NavigationContainer>
  {!!user ? <App /> : <OnboardingStack />}
</NavigationContainer>
```

We'll come back to that soon. First, let's create our onboarding stack!

## 3. Create our phone entry screen

Usually, this step is handled by using the `AuthFlow` from Doorman. Or, you can also use Doorman's `AuthFlow.PhoneScreen` and `AuthFlow.VerifyScreen`.

However, for this example, we're building our own screens entirely.

**Create a file called `Phone-Screen.tsx` in the `src` folder.**

As the name suggests, we're going to create a screen where the user enters their phone number.

We're going to call the `doorman.signInWithPhoneNumber` function, and if it succeeds, we will send them to the code verification screen, like this:

```es6
const onSubmitPhone = async () => {
  const { success } = await doorman.signInWithPhoneNumber({ phoneNumber })
  if (success) {
    navigate('ConfirmScreen', { phoneNumber })
  }
}
```

Here's the full file:

**`src/Phone-Screen.tsx`**

```jsx
import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native'
import { doorman } from 'react-native-doorman'
import { useNavigation } from '@react-navigation/native'

const PhoneScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('+1')
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)

  const onSubmitPhone = async () => {
    setLoading(true)

    const { success } = await doorman.signInWithPhoneNumber({ phoneNumber })

    setLoading(false)

    if (success) {
      navigate('ConfirmScreen', {
        phoneNumber
      })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter your phone number"
        keyboardType="number-pad"
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 8 }} />
      ) : (
        <Button title="Sign in!" onPress={onSubmitPhone} />
      )}
    </View>
  )
}

export default PhoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    padding: 20,
    backgroundColor: 'white',
    fontSize: 20
  }
})
```

This screen is straight-forward. Once the user clicks sign in, we call `doorman.signInWithPhoneNumber`.

If `success` is `true`, then we navigate to the `ConfirmScreen`. We also send the `phoneNumber` as a param to `ConfirmScreen`, since we'll need it in that screen.

Speaking of, let's create the `ConfirmScreen`!

## 4. Create code confirmation screen

This screen will call the `doorman.verifyCode` function.

This function returns a dictionary with a `token`, if the code is entered successfully.

If the token works, we will call `firebase.signInWithCustomToken`, like this:

```es6
const onSubmitCode = async () => {
  const { token } = await doorman.verifyCode({
    code,
    phoneNumber
  })

  if (token) {
    firebase.auth().signInWithCustomToken(token)
  }
}
```

Let's see how this looks in action:

**`src/Confirm-Screen.tsx`**

```jsx
import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { doorman } from 'react-native-doorman'
import { useRoute } from '@react-navigation/native'
import firebase from 'firebase/app'

const ConfirmScreen = () => {
  const [code, setCode] = useState('')
  const { phoneNumber } = useRoute().params
  const [loading, setLoading] = useState(false)

  const onSubmitCode = async () => {
    setLoading(true)

    const { token } = await doorman.verifyCode({
      code,
      phoneNumber
    })

    if (token) {
      firebase.auth().signInWithCustomToken(token)
    } else {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setCode}
        value={code}
        placeholder="Enter your code"
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 8 }} />
      ) : (
        <Button title="Submit code 🔥" onPress={onSubmitCode} />
      )}
    </View>
  )
}

export default ConfirmScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    padding: 20,
    backgroundColor: 'white',
    fontSize: 20
  }
})
```

## 5. Create an onboarding stack

Okay, our main screens are out of the way. Now we use React Navigation to put them into a stack!

Create a file in `src` called **`OnboardingStack.tsx`**

**`src/Onboarding-Stack.tsx`**

```jsx
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
```

That's it for our stack! Now, let's add this back in our `Navigation.tsx` file.

## 6. Add the onboarding stack to our `Navigation` file

Currently, our `src/Navigation.tsx` file looks like this (plus imports at the top):

**`src/Navigation.tsx`**

```jsx
const Navigation = () => {
  const { loading, user } = useAuthGate()

  if (loading) return null

  return <NavigationContainer></NavigationContainer>
}
```

Let's import our `OnboardingStack`, and only render it if there is **not** a user signed in.

If there **is** a user signed in, we render our `<App />` screen (which isn't actually made yet...😇)

**`src/Navigation.tsx`**

```jsx
import OnboardingStack from './Onboarding-Stack'

const Navigation = () => {
  const { loading, user } = useAuthGate()

  if (loading) return null

  return (
    <NavigationContainer>
      {!user ? <OnboardingStack /> : <App />}
    </NavigationContainer>
  )
}
```

💣 Boom! That's (almost!) it.

If you don't have an `App` component made, you can go on to step 7, where I'll make a basic one.

If you already have an app you want to show after the user has auth'd, you can put it in place of the `App` in `Navigation.tsx`.

## 7. Create `src/App.tsx`, shown after user is auth'd

Our `src/App.tsx` component will be shown **after the user has signed in**.

**`src/App.tsx`**

```jsx
import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import {
  Page,
  useDoormanUser,
  H1,
  Paragraph,
  ScreenBackground
} from 'react-native-doorman'
import Constants from 'expo-constants'

const App = () => {
  const { uid, signOut } = useDoormanUser()
  return (
    <Page
      background={() => <ScreenBackground color={['#ff8000', '#ff0000']} />}
      style={styles.page}
    >
      <H1 style={styles.text}>🕺📱</H1>
      <H1 style={styles.text}>Welcome to your Doorman example app!</H1>
      <Paragraph style={styles.text}>
        🤯 You authenticated with your phone number.
      </Paragraph>
      <Paragraph
        style={styles.text}
      >{`How easy was that? (See After-Auth.tsx to edit me.)`}</Paragraph>
      <Paragraph style={styles.text}>
        Your unique user ID is:{' '}
        <Text style={{ fontWeight: 'bold' }}> {uid}</Text>
      </Paragraph>
      <View style={styles.button}>
        <Button title="Sign out" onPress={signOut} color="white" />
      </View>
    </Page>
  )
}

export default App

const styles = StyleSheet.create({
  page: {
    paddingTop: 50 + Constants.statusBarHeight
  },
  button: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: '#ffffff50',
    paddingTop: 30
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
})
```

Ok, I know I said we were only doing custom UI, but Doorman exports some UI components that are too nice not to use. 😊

# Your React Native app now has custom phone auth 🎉

Need help? Have questions? You can email me (fernando@wearpatos.com) or hit me up on our website's live chat (https://doorman.cool). Also, you can find me on [twitter](https://twitter.com/fernandotherojo)
