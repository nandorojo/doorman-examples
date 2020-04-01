# Doorman (React Native Phone Auth) Custom UI Example

This example shows how to use Doorman phone auth with fully custom screens, instead of Doorman's customizable UI.

**Doorman** is a sign-in-with-phone-number SDK that integrates with Firebase auth and Expo. [Learn more here](https://doorman.cool)

I'll leave the UI fully bare.

# Table of Contents

- TLDR
- Clone
- Full Tutorial

# TLDR

First, make sure you wrap your root app with the `DoormanProvider`, and pass your `publicProjectId` as a prop.

Next, there are two main functions we will use: `doorman.signInWithPhoneNumber` and `doorman.verifyCode`. They look like this:

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

# Tutorial

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

```jsx
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore" // if you're using firestore

if (!firebase.apps.length) {
  firebase.initializeApp({
    // you can replace with your firebase config
    apiKey: "AIzaSyCn8HyP1tVZiagk-YvZRwjSwKdwQw5Pvng",
    authDomain: "tester-9d8bb.firebaseapp.com",
    databaseURL: "https://tester-9d8bb.firebaseio.com",
    projectId: "tester-9d8bb",
    storageBucket: "tester-9d8bb.appspot.com",
    messagingSenderId: "760778283392",
    appId: "1:760778283392:web:05cb35d0837c93c6584965"
  })
}
```

Here, all we're doing is initializing our Firebase project. This must be done at the root of your app. You can replace the config with your own.

Next, let's add the `DoormanProvider` to the same file

```es6
import React from "react"
import { DoormanProvider } from "react-native-doorman"

// firebase code here

export default () => {
  return (
    <DoormanProvider publicProjectId="djzlPQFxxzJikNQgLwxN">
      {/* your app will go here */}
    </DoormanProvider>
  )
}
```

You can replace the `publicProjectId` with your own.

## 2. Create the "is authenticated" logic.

There are two scenarios for our app: **1.** the user is logged in, or **2.** the user is not logged in.

The screen we render depends on this state.

Typically, we use Doorman's `AuthGate` component to handle this logic, but for this example, let's use the `useAuthGate` hook instead.

### Create a `src` folder and add a `Navigation.tsx` file

Our React Navigation logic goes in this screen.

**`src/Navigation`**

```jsx
import React from "react"
import { useAuthGate } from "react-native-doorman"
import { NavigationContainer } from "@react-navigation/native"

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

## 3. Create our Phone entry screen

Usually, this step is handled by using the `AuthFlow` from Doorman. Or, you can also use Doorman's `AuthFlow.PhoneScreen` and `AuthFlow.VerifyScreen`.

However, for this example, we're building our own screens entirely.

**Create a file called `Phone-Screen.tsx` in the `src` folder.**

This is where the user will enter their phone number.

Here we're going to create a screen where the user enters their phone number.

We're going to call the `doorman.signInWithPhoneNumber` function, and if it succeeds, we will send them to the code verification screen, like this:

```es6
const onSubmitPhone = async () => {
  const { success } = await doorman.signInWithPhoneNumber({ phoneNumber })
  if (success) {
    navigate("ConfirmScreen")
  }
}
```

Here's the full file:

**`src/Phone-Screen.tsx`**

```jsx
import React, { useState } from "react"
import { View, StyleSheet, TextInput, Button } from "react-native"
import { doorman } from "react-native-doorman"
import { useNavigation } from "@react-navigation/native"

const PhoneScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("+1")
  const { navigate } = useNavigation()

  const onSubmitPhone = async () => {
    const { success } = await doorman.signInWithPhoneNumber({ phoneNumber })
    if (success) {
      navigate("ConfirmScreen")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter your phone number"
        keyboardType="number-pad"
      />
      <Button title="Sign in!" onPress={onSubmitPhone} />
    </View>
  )
}

export default PhoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
```

This screen is straight-forward. Once the user clicks sign in, we call `doorman.signInWithPhoneNumber`.

If `success` is `true`, then we navigate to the `ConfirmScreen`. Speaking of, let's create the `ConfirmScreen`!

## 4. Create code verification screen

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

**`src/Confirm-Screen.tsx`**

```jsx
import React, { useState } from "react"
import { View, TextInput, Button, StyleSheet } from "react-native"
import { doorman } from "react-native-doorman"
import { useRoute } from "@react-navigation/native"
import firebase from "firebase/app"

const ConfirmScreen = () => {
  const [code, setCode] = useState("")
  const { phoneNumber } = useRoute().params

  const onSubmitCode = async () => {
    const { token } = await doorman.verifyCode({
      code,
      phoneNumber
    })

    if (token) {
      firebase.auth().signInWithCustomToken(token)
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
      />
      <Button title="Sign in!" onPress={onSubmitCode} />
    </View>
  )
}

export default ConfirmScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
```
