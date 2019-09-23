import React from 'react'
import { View } from 'react-native'

const Card = props => {
  return <View style={styles.containerStyle}>{props.children}</View>
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  }
}
export default Card
