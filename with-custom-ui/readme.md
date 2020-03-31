# Doorman (React Native + Phone Auth)

This example shows how to use Doorman with fully custom screens.

I'll leave the UI fully bare.

## Overview

First, make sure you wrap your root app with the `DoormanProvider`, and pass your `publicProjectId` as a prop.

Next, there are two main functions we will use: `doorman.signInWithPhoneNumber` and `doorman.verifyCode`.

```es6
import { doorman } from 'react-native-Doorman`

const signIn = () => {
	await doorman.signInWithPhoneNumber({
		phoneNumber: '+15555555555'
	})
}
const verifyCode = () => {
	await doorman.verifyCode({
		phoneNumber: '+15555555555',
		code: '111111'
	})
}
```
