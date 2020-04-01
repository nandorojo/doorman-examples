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
