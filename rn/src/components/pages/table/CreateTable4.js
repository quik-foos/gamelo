import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Fumi } from 'react-native-textinput-effects'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../../constants'
import { TableApi } from '../../../api'
import { connect } from 'react-redux'
import DateTimeInput from '../../ui_elems/DateTimeInput'

class CreateTable4 extends Component {
  createTable = async () => {
    try {
      await TableApi.create({
        host: this.props.user,
        players: [this.props.user],
        joinRequests: [],
        photoURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc1Ctdj6bnwNtgh1VB8hdGCD672Kewkxt9k_yrQBqokgEqpILkvg',
        startTime: this.props.navigation.state.params.startDateTime,
        endTime: this.props.navigation.state.params.endDateTime,
        maxPlayers: this.props.navigation.state.params.maxPlayers,
        location: {
          lng: this.props.navigation.state.params.longitude,
          lat: this.props.navigation.state.params.latitude
        },
        status: 'Scheduled'
      })
      ToastAndroid.show('Table Created Successfully', ToastAndroid.SHORT)
      this.props.navigation.navigate('Home')
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What games are you offering?</Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'darkgray',
            borderWidth: 0.5,
            paddingBottom: 10
          }}
        ></View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            position: 'absolute',
            marginTop: '100%'
          }}
          // onPress={this.goToCreateView}
          onPress={this.createTable}
        >
          <Icon
            name="ios-checkmark-circle-outline"
            color={BUTTON_COLOR}
            size={50}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(CreateTable4)

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
