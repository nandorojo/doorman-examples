import React, { useState } from 'react'
import { DoormanProvider, AuthGate, AuthFlow } from 'react-native-doorman'
import Onboarding from './Onboarding'
import AfterAuth from './AfterAuth'
import { db } from './db'

const AuthLogic = () => {
  const [userExistsInDb, setUserExistsInDb] = useState(false)
  const [checkingIfUserExists, setCheckingIfUserExists] = useState(false)

  return (
    <DoormanProvider
      onAuthStateChanged={async user => {
        if (user) {
          const { uid } = user

          setCheckingIfUserExists(true)

          // 👇 user your own function here that calls your database to check
          // const exists = await checkIfUserExistsInDb(uid)

          // if you're using Firestore, it might look like this:
          const { exists } = await db.doc(`users/${uid}`).get()

          // update the state based on our DB value
          setUserExistsInDb(exists)
          setCheckingIfUserExists(false)
        } else {
          // user is not signed in, reset the state to false
          setUserExistsInDb(false)
          setCheckingIfUserExists(false)
        }
      }}
      publicProjectId="djzlPQFxxzJikNQgLwxN"
    >
      <AuthGate>
        {({ user, loading }) => {
          // add checkingIfUserExists to loading condition
          if (loading || checkingIfUserExists) return <></>

          if (!user) return <AuthFlow />

          // If user is authenticated, but doesn't exist in the DB,
          // render the onboarding flow.
          // We pass it a callback function called onUserAddedToDb
          // this function will set userExistsInDb to true
          // it gets called after the DB has been updated by <Onboarding />
          if (!userExistsInDb) {
            return (
              <Onboarding onUserAddedToDb={() => setUserExistsInDb(true)} />
            )
          }

          return <AfterAuth />
        }}
      </AuthGate>
    </DoormanProvider>
  )
}

export default AuthLogic
