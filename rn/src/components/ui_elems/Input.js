import React from 'react'
import { Text, View, TextInput } from 'react-native'
const input = props => {
  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyles}> {props.label} </Text>
      <TextInput
        value={props.value}
        style={styles.textInputStyles}
        placeholder={props.placeholder}
        autoCorrect={false}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = {
  viewStyles: {},
  textStyles: {},
  textInputStyles: {}
}
export default input
