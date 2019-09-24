import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Fumi } from 'react-native-textinput-effects'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../../constants'

import DateTimeInput from '../../ui_elems/DateTimeInput'

class CreateTable3 extends Component {
  state = {
    maxPlayers: 4
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the maximum number of players?</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 50,
            alignItems: 'center'
          }}
        >
          <View
            style={{ flex: 2, paddingHorizontal: 20, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 35, color: BUTTON_COLOR }}>
              {this.state.maxPlayers}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                this.setState({ maxPlayers: this.state.maxPlayers + 1 })
              }
            >
              <Icon name="ios-add" color={BUTTON_COLOR} size={50} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingTop: 20 }}
              onPress={() =>
                this.setState({ maxPlayers: this.state.maxPlayers - 1 })
              }
            >
              <Icon name="ios-remove" color={BUTTON_COLOR} size={50} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            position: 'absolute',
            marginTop: '100%'
          }}
          // onPress={this.goToCreateView}
          onPress={() =>
            this.props.navigation.navigate('CreateTable4', {
              latitude: this.props.navigation.state.params.latitude,
              longitude: this.props.navigation.state.params.longitude,
              startDateTime: this.props.navigation.state.params.startDateTime,
              endDateTime: this.props.navigation.state.params.endDateTime,
              maxPlayers: this.state.maxPlayers
            })
          }
        >
          <Icon name="ios-arrow-dropright" color={BUTTON_COLOR} size={50} />
        </TouchableOpacity>
      </View>
    )
  }
}
export default CreateTable3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  title: {
    marginBottom: 30,
    marginTop: 25,
    fontSize: 32,
    color: BUTTON_COLOR,
    textAlign: 'center'
  }
})
