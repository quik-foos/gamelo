import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {


    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};


const styles = {
  containerStyle: {
    flexDirection: 'column', 
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'yellow',
    borderColor: '#ddd',
    position: 'relative'
  }
};
export default CardSection;
