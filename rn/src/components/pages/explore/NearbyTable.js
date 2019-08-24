import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../ui_elems/Button';
import Card from '../../ui_elems/Card';
import CardSection from '../../ui_elems/CardSection';

import {TouchableOpacity} from 'react-native';

export default class NearbyTable extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card style={styles.cardStyle}>
          <CardSection>
            <View style={styles.headerContentStyle}>
              <Text style={[styles.albumTitle, styles.headerTextStyle]}>
                {this.props.host} {'\n'}
                {this.props.distance} {this.props.start} {'\n'}
                Games: {this.props.games}
                {'\n\n'}
              </Text>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }
}


const styles = {
  albumTitle: {
      color: 'black'
  },
  headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  headerTextStyle: {
      fontSize: 18
  },
  thumbnailStyle: {
      height: 50,
      width: 50
  },
  thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
  },
  imageStyle: {
      height: 300,
      flex: 1,
      width: null
  },
  cardStyle: {
  }
};

