import React, { useState } from 'react'

import { TextInput, Button, StyleSheet } from 'react-native'
import { useDoormanUser, H1, Page } from 'react-native-doorman'
import { db } from './db'

type Props = {
  onUserAddedToDb: () => void
}

const Onboarding = ({ onUserAddedToDb }: Props) => {
  const [name, setName] = useState('')
  const { uid } = useDoormanUser()

  const handleSubmit = async () => {
    // 👇 Implement your own DB function here
    // await addUserToDb({ uid, name })

    // ...or, if you're using Firestore, it might look like:
    await db.doc(`users/${uid}`).set({ name }, { merge: true })

    // Finally, once the user has been added,
    // call the callback function from the props.
    // 🚨if you forget to call this function, the app won't re-render
    onUserAddedToDb()
  }

  return (
    <Page style={styles.container}>
      <H1 style={styles.h1}>Create an account</H1>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Submit name" onPress={handleSubmit} />
    </Page>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: 'center',
  },
  input: {
    padding: 16,
    margin: 16,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  h1: {
    marginHorizontal: 16,
    textAlign: 'center',
  },
})
