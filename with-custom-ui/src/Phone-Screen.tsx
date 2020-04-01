import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  Linking
} from 'react-native'
import { doorman, H1, Paragraph } from 'react-native-doorman'
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
      <H1>Custom UI Doorman example</H1>
      <Paragraph>
        This example exists for those who {`don't`} want to use any of Doorman
        {`'s`} UI components.
      </Paragraph>
      <Paragraph>
        Doorman UI is awesome, so if you want to use it, see the{' '}
        <Text
          onPress={() => Linking.openURL('https://docs.doorman.cool')}
          style={{ fontWeight: 'bold', color: 'green' }}
        >
          Doorman docs
        </Text>
        .
      </Paragraph>
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
    padding: 16
  },
  input: {
    padding: 20,
    backgroundColor: 'white',
    fontSize: 20
  }
})
