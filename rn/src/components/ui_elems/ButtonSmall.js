import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BUTTON_COLOR } from '../../constants';

const ButtonSmall = ({onPress, text }) => {
  const {buttonStyle, textStyle, bodyContent} = styles;
  return (
      <View style={bodyContent}>
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = {
  buttonStyle: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:170,
    borderRadius:30,
    backgroundColor: BUTTON_COLOR,
  },
  bodyContent: {
    alignItems: 'center',
    padding:10,
  },
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
    
  },
};

export default ButtonSmall;
