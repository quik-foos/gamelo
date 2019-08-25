import React, {Component, Fragment} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import Button from '../../ui_elems/Button';
import ButtonSmall from '../../ui_elems/ButtonSmall';
import { connect } from 'react-redux';
import { TableApi } from '../../../api';
import {setTableAction} from '../../../actions'

class ViewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 6,
      status: "Scheduled",
      hostId: "",
      hostName: "",
      players: []
    };
  }

  componentDidMount() {
    this.fetchTable();
  }

  fetchTable = async () => {
    try {
      const response = await TableApi.findOne({id: this.props.id});
      const table = await response.data;
      this.setState({
        status: table.status,
        hostId: table.host._id,
        hostName: table.host.firstName + " " + table.host.lastName,
        players: table.players,
      });
    } catch {
    }
  }

  navigateToProfile = (profile_id) => {
    this.props.navigation.navigate('Profile', {id: profile_id});
  };

  getGuestView = () => {
    return <View>
      <Text>{this.state.hostName}'s Table</Text>
      {this.getCurrentPlayers()}
      {this.state.status === "Scheduled" &&
        <Text>Waiting to start&hellip;</Text>
      }
      {(this.state.status === "In-Progress" || this.state.status === "Completed") &&
        this.getResults()
      }
      {this.state.status === "In-Progress" ||
        <Button
          text="Record game result"
          onPress={this.createResult}
        />
      }
    </View>;
  }

  getCurrentPlayers = () => <Fragment>
    <Text>Current Players {this.state.players.length} / {this.state.max} </Text>
    {this.state.players.map((player, key) => {
      return <TouchableOpacity key={key} onPress={() => {this.navigateToProfile(player._id)}}>
        <Text>
          {player.username}
        </Text>
      </TouchableOpacity>;
    })}
  </Fragment>;
  
  createJoinRequest = async () => {
    try {
      await TableApi.addJoinRequest({id: this.props.id, userId: this.props.user});
      // console.log("2");
      await this.props.dispatch(setTableAction(this.props.id));
      // console.log("3");
      this.props.navigateToTable();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return <View>
      {this.getCurrentPlayers()}
      <Button
        text="Request to join"
        onPress={this.createJoinRequest}
      />
      <Button
        text="Back"
        onPress={this.props.return}
      />
    </View>;
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ViewTable);