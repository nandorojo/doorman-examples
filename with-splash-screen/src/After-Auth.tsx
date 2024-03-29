import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import {
  Page,
  useDoormanUser,
  H1,
  Paragraph,
  ScreenBackground,
} from 'react-native-doorman'
import Constants from 'expo-constants'

const App = () => {
  const { uid, signOut, phoneNumber } = useDoormanUser()
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
      >{`How easy was that? (See src/After-Auth.tsx to edit me.)`}</Paragraph>
      <Paragraph style={styles.text}>
        User ID: <Text style={{ fontWeight: 'bold' }}>{uid}</Text> Phone Number:{' '}
        <Text style={{ fontWeight: 'bold' }}>{phoneNumber}</Text>
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
    paddingTop: 50 + Constants.statusBarHeight,
  },
  button: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: '#ffffff50',
    paddingTop: 30,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
})
