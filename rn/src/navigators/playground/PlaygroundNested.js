import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import AnotherComponent from './AnotherComponent'

class playgroundNested extends Component {
  state = {
    anotherComponent: false
  }
  render() {
    if (this.state.anotherComponent) {
      return <AnotherComponent navigation={this.props.navigation} />
    } else {
      return (
        <View style={styles.container}>
          <Button
            title="go to another component"
            onPress={() => {
              this.setState({ anotherComponent: true })
            }}
          />
          <Text>playgroundNested</Text>
        </View>
      )
    }
  }
}
export default playgroundNested

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
