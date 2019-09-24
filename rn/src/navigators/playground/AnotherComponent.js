import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

class AnotherComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="go back to home"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />
        <Text>playgroundNested</Text>
      </View>
    )
  }
}
export default AnotherComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
