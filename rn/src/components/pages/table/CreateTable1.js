import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Fumi } from 'react-native-textinput-effects'
import RNGooglePlaces from 'react-native-google-places'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../../constants'

class CreateTable1 extends Component {
  state = {
    latitude: '',
    longitude: ''
  }

  showLocationPicker = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        this.setState({
          latitude: place.location.latitude,
          longitude: place.location.longitude
        })

        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)) // error is a Javascript Error object
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Where are you going to host your Table?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'darkgray',
            borderWidth: 0.5
          }}
        >
          <Fumi
            style={{ flex: 1 }}
            label={'Location'}
            iconClass={FontAwesomeIcon5}
            iconName={'dice-one'}
            iconColor={'#005756'}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            value={`${this.state.latitude}${this.state.longitude ? ',' : ''} ${
              this.state.longitude
            }`}
            onFocus={() => this.showLocationPicker()}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            position: 'absolute',
            marginTop: '100%'
          }}
          // onPress={this.goToCreateView}
          onPress={() =>
            this.props.navigation.navigate('CreateTable2', {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            })
          }
        >
          <Icon name="ios-arrow-dropright" color={BUTTON_COLOR} size={50} />
        </TouchableOpacity>
      </View>
    )
  }
}
export default CreateTable1

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
