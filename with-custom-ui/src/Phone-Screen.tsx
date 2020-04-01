import React, { useState } from "react"
import { View, StyleSheet, TextInput, Button } from "react-native"
import { doorman } from "react-native-doorman"
import { useNavigation } from "@react-navigation/native"

const PhoneScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("+1")
  const { navigate } = useNavigation()

  const onSubmitPhone = async () => {
    const { success } = await doorman.signInWithPhoneNumber({ phoneNumber })
    if (success) {
      navigate("ConfirmScreen")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter your phone number"
        keyboardType="number-pad"
      />
      <Button title="Sign in!" onPress={onSubmitPhone} />
    </View>
  )
}

export default PhoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
