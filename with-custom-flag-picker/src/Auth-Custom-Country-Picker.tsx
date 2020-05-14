import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { AuthFlow } from 'react-native-doorman'
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal'
import { View } from 'react-native'
import ReactNativePhoneInput from '@nandorojo/react-native-phone-input'

const AuthWithCustomCountryPicker = () => {
  const phoneInputRef = useRef<ReactNativePhoneInput>()
  const ref = useRef({
    test: () => true,
  })
  const phoneScreenProps = useMemo(
    () => ({
      phoneInputProps: {
        onPressFlag: () => void setIsPickerOpen(true),
      },
      inputRef: phoneInputRef,
    }),
    []
  )
  const [countryCode, setCountryCode] = useState<CountryCode>('US')
  const onSelect = useCallback(country => {
    // update the text input
    // console.log({ testRef: ref })
    // console.log('ref', phoneInputRef)
    phoneInputRef.current.selectCountry(country.cca2.toLowerCase())
    // update the flag picker state
    setCountryCode(country.cca2)
  }, [])
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      <CountryPicker
        countryCode={countryCode}
        onSelect={onSelect}
        onClose={() => setIsPickerOpen(false)}
        visible={isPickerOpen}
      />
      <AuthFlow phoneScreenProps={phoneScreenProps} />
    </View>
  )
}

export default AuthWithCustomCountryPicker
