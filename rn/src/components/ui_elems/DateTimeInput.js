import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { BUTTON_COLOR } from '../../constants'
const moment = require('moment')

export default class DateTimeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickerVisible: false
    }
  }

  showPicker = () => {
    this.setState({ pickerVisible: true })
  }

  hidePicker = () => {
    this.setState({ pickerVisible: false })
  }
  render() {
    return (
      <View>
        <Text style={styles.timePickerLabel}>{this.props.label}</Text>
        <TouchableOpacity onPress={this.showPicker}>
          <Text
            style={{ fontSize: 18, color: BUTTON_COLOR, textAlign: 'center' }}
          >
            {this.props.date
              ? moment(this.props.date).format('YYYY-MM-DD') +
                ' at ' +
                moment(this.props.date).format('h:mm a')
              : 'Select Date'}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.pickerVisible}
          onConfirm={date => {
            this.props.onChangeDate(date)
            this.hidePicker()
          }}
          onCancel={this.hidePicker}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timePickerLabel: {
    marginTop: 10,
    marginBottom: 15,
    color: BUTTON_COLOR,
    textAlign: 'center'
  }
})
