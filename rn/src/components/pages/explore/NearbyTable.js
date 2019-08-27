import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../../ui_elems/Button';
import Card from '../../ui_elems/Card';
import CardSection from '../../ui_elems/CardSection';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NearbyTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Card>
              <CardSection>
                <View>
                  <Image
                    source={{ uri: this.props.photoURL }}
                    style={styles.imageStyle}
                  />
                </View>
              </CardSection>
              <CardSection>
                <View style={{
                  width: 150,
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <Icon style={{marginLeft: 15, marginRight: 20}} name="ios-contact" color='black' size={24} />
                  <Text style={{ marginTop: 10 }}>
                    {this.props.host} {'\n'}
                  </Text>

                </View>
                <View style={{
                  width: 150,
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <Icon style={{marginLeft: 15, marginRight: 20}} name="md-map" color='black' size={24} />
                  <Text style={{ marginTop: 10 }}>
                    {this.props.distance.toFixed(1)} Km(s) Away{'\n'}
                  </Text>
                </View>


                <View style={{
                  width: 150,
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <Icon style={{marginLeft: 10, marginRight: 20}} name="ios-time" color='black' size={24} />
                  <Text style={{ marginTop: 10 }}>
                    {/* {this.props.start.split(" ").slice(0,4).join(' ')}{'\n'} at {this.props.start.split(" ")[4]} {'\n'} */}
                    {this.props.start.split('T')[0]}{'\n'} at {this.props.start.split('T')[1].split('.000')[0]} {'\n'}
                  </Text>
                </View>
                <View style={{
                  width: 150,
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <Icon style={{marginTop: 5, marginLeft: 15, marginRight: 20}} name="logo-game-controller-b" color='black' size={24} />
                  <Text>
                    {'\n'}{this.props.games}

                  </Text>
                </View>

              </CardSection>
            </Card>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = {
  albumTitle: {
    color: 'black'
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    flex: 1,
    marginTop: 5,
    width: 150,
    height: 200
  },
  cardStyle: {
  }
};

