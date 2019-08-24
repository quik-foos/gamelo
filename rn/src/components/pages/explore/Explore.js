import React, {Component} from 'react';
import {View, Text} from 'react-native';
import NearbyTable from './NearbyTable';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {TableApi, UserApi} from '../../../api';

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: ["1","2"],
      tables: []
    };
  }

  componentDidMount = async () => {
    let tables = [];
    let users = [];
    try {
    let res = await TableApi.findAll();
    tables = await res.data
    console.log(tables);
    } catch (e) {
      await
      console.log("That")
       this.setState({tables: []});
      // ToastAndroid.show(e.response.data.message, 'Failed to fetch tables');
    }
      this.setState({
        tables: tables,
    });
    console.log(this.state.tables[1].host.firstName)
  };

  navigateToTable = async table => {
    this.props.navigation.navigate('Table'), {table: table};
  };

  render() {
    return (
      <ScrollView>
        <View>   
        {this.state.tables.map((table,key)=>{
          console.log(table.host.firstName)
            return(
              <NearbyTable
                key={key}
                players={table.players}
                games="Settlers of Catan, Monopoly, Scrabble"
                host={table.host.firstName}
                distance={table.location.lat}
                start={table.startTime}
                {...this.props}
                onPress={() => {
                  this.navigateToTable(this.state.data);
                ;}}
              />
            );
          })}
          <NearbyTable
            games="Codenames, Telestrations, Connect 4"
            host="Lucas"
            distance="1.3km"
            start="7:30pm"
          />
        </View>
      </ScrollView>
    );
  }
}
