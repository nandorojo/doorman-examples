import React from 'react'
import { Page, ScreenBackground, Paragraph, H1 } from 'react-native-doorman'
import { StyleSheet, Button, View } from 'react-native'
import Constants from 'expo-constants'

type Props = {
  /**
   * This function will trigger the withPhoneAuth to open the phone auth screen.
   *
   * This is a **required** prop of the splash screen component.
   */
  next: () => void
}

const SplashScreen = ({ next }: Props) => {
  return (
    <Page background={() => <ScreenBackground />}>
      <H1 style={styles.text}>
        Welcome to Doorman! This is your splash screen.
      </H1>
      <Paragraph
        style={styles.text}
      >{`😇 Doorman brings Firebase phone auth to Expo apps, effortlessly.`}</Paragraph>
      <Paragraph
        style={styles.text}
      >{`👀 Peep the 3 files in ./src to see how easy it is.`}</Paragraph>
      <Paragraph
        style={styles.text}
      >{`🚪 Also, our website: doorman.cool`}</Paragraph>
      <View style={styles.button}>
        <Button
          title="Sign In With Phone Number"
          color="white"
          onPress={next}
        />
      </View>
    </Page>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  page: {
    paddingTop: 50 + Constants.statusBarHeight,
  },
  text: { color: 'white', textAlign: 'center', marginBottom: 24 },
  button: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: '#ffffff50',
    paddingTop: 30,
  },
})
