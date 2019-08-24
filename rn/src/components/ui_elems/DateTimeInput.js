import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
const moment = require('moment');

export default class DateTimeInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      pickerVisible: false
    };
  }

  showPicker = () => {
    this.setState({pickerVisible: true});
  }

  hidePicker = () => {
    this.setState({pickerVisible: false});
  }
  render(){
    return (
      <View>
        <Text>
          {this.props.label}
        </Text>
        <TouchableOpacity onPress={this.showPicker}>
          <Text>
            {moment(this.props.date).format("YYYY-MM-DD h:mm a")}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.pickerVisible}
          onConfirm={date => {
            this.props.onChangeDate(date);
            this.hidePicker();
          }}
          onCancel={this.hidePicker}
        />
      </View>
    );
  }
}