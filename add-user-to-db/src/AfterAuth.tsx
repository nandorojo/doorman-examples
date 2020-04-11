import React from 'react'
import {
  Page,
  ScreenBackground,
  useDoormanUser,
  H1,
  Paragraph,
} from 'react-native-doorman'
import { Button } from 'react-native'

const AfterAuth = () => {
  const { uid, signOut } = useDoormanUser()
  return (
    <Page
      style={{ marginTop: 100, alignItems: 'center' }}
      background={() => <ScreenBackground />}
    >
      <H1 style={{ color: 'white' }}>Welcome to Doorman.</H1>
      <Paragraph style={{ color: 'white' }}>
        Sign out below, if {`you'd`} like. Your user id is {uid}.
      </Paragraph>
      <Button title="Sign Out" color="white" onPress={signOut} />
    </Page>
  )
}

export default AfterAuth
