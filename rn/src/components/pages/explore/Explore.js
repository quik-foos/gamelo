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
      tables: [],
      view: "nearby",
      tableID: "nibba",
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

       this.setState({tables: []});
      // ToastAndroid.show(e.response.data.message, 'Failed to fetch tables');
    }
      this.setState({
        tables: tables,
    });
  };

  navigateToTable = async table => {
    this.props.navigation.navigate('Table'), {table: table};
  };

  displayNearby = () =>{
    return (<ScrollView>
    <View>   
    {this.state.tables.map((table,key)=>{
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
              this.displayTable(table.host.id);
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
  </ScrollView>);
  }

  displayTable = tableID => {
    this.setState({
      view: "table",
      tableID:tableID
    }) 
  }

  render() {
    if(this.state.view=="nearby"){
      return this.displayNearby();
    }else {
      return(
      <View>
        <Text>
        DON'T TOUCH MY SPAGHETT!!
        </Text>
      </View>
      )
    }

  }
}
