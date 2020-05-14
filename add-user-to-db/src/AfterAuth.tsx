import React from 'react'
import {
  Page,
  ScreenBackground,
  useDoormanUser,
  H1,
  Paragraph,
  Input,
} from 'react-native-doorman'
import { Button } from 'react-native'

const AfterAuth = () => {
  const { uid, signOut } = useDoormanUser()
  return (
    <Page
      style={{ marginTop: 100, width: '100%' }}
      background={() => <ScreenBackground color={['green', 'orange']} />}
    >
      <H1 centered style={{ color: 'white' }}>
        Welcome to Doorman.
      </H1>
      <Paragraph centered style={{ color: 'white' }}>
        Sign out below, if {`you'd`} like. Your user id is {uid}.
      </Paragraph>
      <Input />
      <Button title="Sign Out" color="white" onPress={signOut} />
    </Page>
  )
}

export default AfterAuth
