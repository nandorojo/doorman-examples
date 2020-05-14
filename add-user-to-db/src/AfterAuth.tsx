import React from 'react'
import {
  Page,
  ScreenBackground,
  useDoormanUser,
  H1,
  Paragraph,
  Input,
  Header,
} from 'react-native-doorman'

const AfterAuth = () => {
  const { uid, signOut } = useDoormanUser()

  const renderHeader = () => (
    <Header
      containerStyle={{
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        borderBottomWidth: 0,
      }}
      centerComponent={{
        text: 'Welcome!',
        style: {
          color: 'white',
          fontWeight: '500',
          fontSize: 18,
        },
      }}
      leftComponent={{
        icon: 'arrow-back',
        onPress: signOut,
        color: 'white',
      }}
    />
  )

  return (
    <Page
      style={{ marginTop: 100, width: '100%' }}
      background={() => <ScreenBackground color={['green', 'orange']} />}
      header={renderHeader}
    >
      <H1 centered style={{ color: 'white' }}>
        Welcome to Doorman.
      </H1>
      <Paragraph centered style={{ color: 'white' }}>
        To sign out, click the back arrow above. Your user id is {uid}.
      </Paragraph>
      <Input placeholder="Type here!" textAlign="center" />
    </Page>
  )
}

export default AfterAuth
