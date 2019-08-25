import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CreateTable from './CreateTable';
import MakeResult from './MakeResult';
import Result from './Result';
import Button from '../../ui_elems/Button';
import ButtonSmall from '../../ui_elems/ButtonSmall';
import { connect } from 'react-redux';
import { TableApi, ResultApi } from '../../../api';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 6,
      status: "Scheduled",
      hostId: "",
      hostName: "",
      players: [],
      joinRequests: [],
      results: [],
      view: "normal", // for a host's view, guest's view, etc.
        // "create" for creating a table
        // "making-result" for creating a game record
        // "viewing-result" for viewing and accepting / rejecting a game record
      resultIdViewed: 0
        // when view is "viewing-result"
    };
    this.interval = 0;
  }

  componentDidMount() {
    this.getRelevantTable()
    if (!this.state.id) {
      this.updateData()
    }
    this.interval = setInterval(this.updateData, 10000);
  }

  updateData = () => {
    this.getRelevantTable();
    this.fetchResults();
  }

  getRelevantTable = async () => {
    try {
      let response = await TableApi.findAll({host: this.props.user});
      let tables = await response.data;
      let table = {}
      console.log(tables)
      if (tables.length > 0) {
        table = tables[0]
        await this.setState({
          id: table._id,
          status: table.status,
          hostId: table.host._id,
          hostName: table.host.firstName + " " + table.host.lastName,
          players: table.players,
          joinRequests: table.joinRequests
        })
        return
      } 
      response = await TableApi.findAll({players: this.props.user});
      tables = await response.data;
      console.log(tables)
      if (tables.length > 0) {
        table = tables[0]
        await this.setState({
          id: table._id,
          status: table.status,
          hostId: table.host._id,
          hostName: table.host.firstName + " " + table.host.lastName,
          players: table.players,
          joinRequests: table.joinRequests
        })
        return
      }
      response = await TableApi.findAll({joinRequests: this.props.user});
      tables = await response.data;
      console.log(tables)
      if (tables.length > 0) {
        table = tables[0]
        await this.setState({
          id: table[0]._id,
          status: table.status,
          hostId: table.host._id,
          hostName: table.host.firstName + " " + table.host.lastName,
          players: table.players,
          joinRequests: table.joinRequests
        })
        return
      }
    } catch (e) {
      console.log(e);
    }
  }

  fetchTable = async () => {
    try {
      const response = await TableApi.findOne({id: this.state.id});
      const table = await response.data;
      this.setState({
        status: table.status,
        hostId: table.host._id,
        hostName: table.host.firstName + " " + table.host.lastName,
        players: table.players,
        joinRequests: table.joinRequests
      });
    } catch {
    }
  }

  fetchResults = async () => {
    try {
      const response = await ResultApi.findAll({table: this.props.id});
      const results = await response.data;
      this.setState({
        results: results
      })
    } catch {
    }
  }

  cancelJoinRequest = async () => {
    try {
      await TableApi.removeJoinRequest({id: this.props.id, userId: this.props.user});
    } catch (e) {
      console.log(e);
    }
  }

  kickPlayer = (playerId) => {
    try {
      TableApi.removePlayer({id: this.props.id, userId: playerId});
    } catch {
    }
  }

  acceptJoinRequest = (joinRequestId) => {
    try {
      TableApi.removeJoinRequest({id: this.props.id, userId: joinRequestId});
      TableApi.addPlayer({userId: joinRequestId});
    } catch {

    }
  }

  rejectJoinRequest = (joinRequestId) => {
    try {
      TableApi.removeJoinRequest({id: this.props.id, userId: joinRequestId});
    } catch {

    }
  }

  startPlaying = () => {
    try {
      TableApi.update({id: this.props.id, status: "In-Progress"});
    } catch {

    }
  }

  endSession = () => {
    try {
      TableApi.update({id: this.props.id, status: "Completed"});
    } catch {

    }
  }

  navigateToProfile = (profile_id) => {
    this.props.navigation.navigate('Profile', {id: profile_id});
  };
  
  goToNormalView = () => {
    this.setState({
      view: "normal"
    })
  }

  goToCreateView = () => {
    this.setState({
      view: "create"
    });
  }

  goToResultView = (resultId) => {
    this.setState({
      view: "viewing-result",
      resultIdViewed: resultId
    })
  }

  getNoneView = () => {
    return <View style={styles.noTable}>
      <Text style={styles.noTableText}>You're not part of any table.</Text>
      <Button
        text="Create a table"
        onPress={this.goToCreateView}
      />
    </View>;
  }

  getWaitingView = () => {
    return <View>
      <Text>{this.state.hostName}'s Table</Text>
      {this.getCurrentPlayers()}
      <Text>Waiting for host to accept&hellip;</Text>
      <Button
        text="Cancel request"
        onPress={this.cancelJoinRequest}
      />
    </View>;
  }

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

  getHostView = () => {
    return <View>
      <Text>Your Table</Text>
      {this.getCurrentPlayers()}
      {this.state.status === "Scheduled" &&
        <Button
          text="Start playing"
          onPress={this.startPlaying}
        />
      }
      {(this.state.status === "In-Progress" || this.state.status === "Completed") &&
        this.getResults()
      }
      {this.state.status === "In-Progress" &&
        <Button
          text="End session"
          onPress={this.endSession}
        />
      }
      {this.state.status === "In-Progress" ||
        <Button
          text="Record game result"
          onPress={this.createResult}
        />
      }
    </View>;
  }

  getCreateView = () => {
    return <CreateTable cancelAction={this.goToNormalView}/>;
  }

  getCreateResultView = () => {
    return <MakeResult
      cancelAction={this.goToNormalView}
      tableId={this.props.id}
    />;
  }

  getResultView = () => {
    return <Result
      id={this.state.resultIdViewed}
      cancelAction={this.goToNormalView}
    />;
  }

  getCurrentPlayers = () => <Fragment>
    <Text>Current Players {this.state.players.length} / {this.state.max} </Text>
    {this.state.players.map((player, key) => {
      return <TouchableOpacity key={key} onPress={() => {this.navigateToProfile(player._id)}}>
        <View>
          <Text>{player.username}</Text>
          {(this.props.user === this.state.hostId) &&
            <ButtonSmall
              text="Kick player"
              onPress={() => {this.kickPlayer(player._id)}}
            />
          }
        </View>
      </TouchableOpacity>;
    })}
  </Fragment>;

  getJoinRequests = () => <Fragment>
    <Text>Join Requests</Text>
    {this.state.joinRequests.map((joinRequest, id) => {
      return <View key={id}>
        {joinRequest.username}
        <ButtonSmall
          text="Accept"
          onPress={() => {this.acceptJoinRequest(joinRequest._id)}}
        />
        <ButtonSmall
          text="Reject"
          onPress={() => {this.rejectJoinRequest(joinRequest._id)}}
        />
      </View>;
    })}
  </Fragment>;
  
  getResults = () => <Fragment>
    <Text>Games Played</Text>
    {this.state.results.map((result, id) => {
      return <TouchableOpacity key={id} onPress={() => {this.goToResultView(result._id)}}>
        <Text>
          {result.game.name}
        </Text>
      </TouchableOpacity>;
    })}
  </Fragment>


  render() {
    if (this.state.view === "making-result") {
      return this.getCreateResultView();
    }
    if (this.state.view === "viewing-result") {
      return this.getResultView();
    }
    if (this.state.view === "create") {
      return this.getCreateView();
    }
    if (this.props.user === this.state.hostId) {
      // This is a host
      return this.getHostView();
    }
    if (this.state.players.map(player => player._id).includes(this.props.user)) {
      // This is a guest
      return this.getGuestView();
    }
    if (this.state.joinRequests.map(player => player._id).includes(this.props.user)) {
      // User has an active join request
      return this.getWaitingView();
    }
    return this.getNoneView();
  }
}

const mapStateToProps = state => ({
  user: state.user,
  id: state.table
})

const styles = StyleSheet.create({
  noTable: {
    borderColor: '#123456',
    padding:15,
    marginTop:180,
    alignSelf: "center"
  },
  noTableText:{
    fontSize:24,
    paddingBottom:35
  }

});



export default connect(mapStateToProps)(Table);
