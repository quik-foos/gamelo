import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { BUTTON_COLOR } from '../../constants'

const Button = ({ onPress, text }) => {
  const { buttonStyle, textStyle } = styles
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    backgroundColor: BUTTON_COLOR,
    borderRadius: 5,
    margin: 10,
    padding: 20
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Rubik-Bold',
    fontWeight: '600',
    color: '#fff'
  }
}

export default Button
