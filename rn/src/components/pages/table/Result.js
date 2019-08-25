import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Button from '../../ui_elems/Button';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    try {
      // fetchData
    } catch {

    }
  }

  acceptResult = () => {

  }

  rejectResult = () => {

  }

  getPlayers = () => {
    return <View>
      {this.state.result.players.map(player => <View>
        <Text>{player._id}</Text>
        {this.state.result.winner.map(winne => winne._id).includes(player._id) &&
          <Text>
            Winner
          </Text>
        }
      </View>)};
    </View>;
  }

  getButtons = () => {
    let validated = false;
    if (this.state.result.validatedPlayers.map(player => player._id).includes(this.props.user)) {
      validated = true;
    }
    return <View>
      <Button
        text="Return"
        onPress={this.props.cancelAction}
      />
      <Button
        text="Accept"
        onPress={this.acceptResult}
      />
      <Button
        text="Reject"
        onPress={this.rejectResult}
      />
    </View>
  }

  render() {
    if (!this.state.result) {
      return <View />;
    }
    return <View>
      <Text>Game Played</Text>
      <Text>{this.state.result.game.name}</Text>
      <Text>Players</Text>
      {this.getPlayers()}
      {this.getButtons()}
    </View>;
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Result);