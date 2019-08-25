import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../../ui_elems/Button';
import Card from '../../ui_elems/Card';
import CardSection from '../../ui_elems/CardSection';

import { TouchableOpacity } from 'react-native';

export default class NearbyTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={{width: '30%' }} onPress={this.props.onPress}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black'}}>
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
              <View>
                <Text style={[styles.albumTitle, styles.headerTextStyle]}>
                  Hosted by {this.props.host} {'\n'}
                  {this.props.distance.toFixed(1)} Km(s) Away{'\n'}
                  Starts {this.props.start.split('T')[0]} at {this.props.start.split('T')[1].split('.000')[0]} {'\n'}
                  {/* Games {this.props.games} */}
                </Text>
              </View>
            </CardSection>

          </Card>
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
    width: 100,
    height: 100
  },
  cardStyle: {
  }
};

