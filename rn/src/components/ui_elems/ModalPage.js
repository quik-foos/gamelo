import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'

export default class ModalPage extends Component {
  render() {
    return <View style={styles.modalPage}>{this.props.children}</View>
  }
}
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  modalPage: {
    position: 'absolute',
    backgroundColor: '#FFF',
    left: 0,
    top: 0,
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    zIndex: 10
  }
})
