import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Fumi } from 'react-native-textinput-effects'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../../constants'

import DateTimeInput from '../../ui_elems/DateTimeInput'

class CreateTable2 extends Component {
  state = {
    startDateTime: '',
    endDateTime: ''
  }

  setStartDateTime = dateTime => {
    formatted = `${dateTime}`
      .split('')
      .slice(0, 21)
      .join('')
    this.setState({
      startDateTime: formatted
    })
  }

  setEndDateTime = dateTime => {
    formatted = `${dateTime}`
      .split('')
      .slice(0, 21)
      .join('')
    this.setState({
      endDateTime: formatted
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>When are you hosting your Table?</Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'darkgray',
            borderWidth: 0.5,
            paddingBottom: 10
          }}
        >
          <View
            style={{ flex: 1, paddingHorizontal: 20, alignItems: 'center' }}
          >
            <DateTimeInput
              label="Start Time"
              onChangeDate={this.setStartDateTime}
              date={this.state.startDateTime}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 35,
            borderColor: 'darkgray',
            borderWidth: 0.5,
            paddingBottom: 10
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              alignItems: 'center'
            }}
          >
            <DateTimeInput
              label="End Time"
              onChangeDate={this.setEndDateTime}
              date={this.state.endDateTime}
            />
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
            this.props.navigation.navigate('CreateTable3', {
              latitude: this.props.navigation.state.params.latitude,
              longitude: this.props.navigation.state.params.longitude,
              startDateTime: this.state.startDateTime,
              endDateTime: this.state.endDateTime
            })
          }
        >
          <Icon name="ios-arrow-dropright" color={BUTTON_COLOR} size={50} />
        </TouchableOpacity>
      </View>
    )
  }
}
export default CreateTable2

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
