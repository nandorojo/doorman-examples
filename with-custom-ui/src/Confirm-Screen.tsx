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
