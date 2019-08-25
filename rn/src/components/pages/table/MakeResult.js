import React, { Component } from 'react';
import {View, Text} from 'react-native';
import GamePicker from '../../ui_elems/GamePicker';
import Button from '../../ui_elems/Button';
import Checky from '../../ui_elems/Checky';
import { connect } from 'react-redux';
import { TableApi, ResultApi } from '../../../api';

class MakeResult extends Component {
	constructor(props) {
    super(props);
    this.state = {
      stage: 0, // 0: which game? 1: who played? 2: who won?
      game: null,
      tablePlayers: [],
      players: [],
      winners: []
    };
  }

  componentDidMount() {
    this.fetchTable();
  }

  fetchTable = async () => {
    try {
      const response = await TableApi.findOne({id: this.props.tableId});
      const data = await response.data;
      this.setState({
        tablePlayers: data.players
      })
    } catch {

    }
  }

  goToStage1 = () => {
    this.setState({
      stage: 1
    });
  }

  goToStage2 = () => {
    this.setState({
      stage:2
    });
  }

  setGame = game => {
    this.setState({
      game: game
    })
  }

  togglePlayer = player => {
    this.setState(prevState => {
      if (prevState.players.includes(player)) {
        let playersOut = prevState.players.slice(0);
        playersOut.splice(playersOut.indexOf(player), 1);
        return {
          players: playersOut
        };
      } else {
        let playersOut = prevState.players.slice(0);
        playersOut.push(player)
        return {
          players: playersOut
        };
      }
    })
  }

  toggleWinner = winner => {
    this.setState(prevState => {
      if (prevState.winners.includes(winner)) {
        let winnersOut = prevState.winners.slice(0);
        winnersOut.splice(winnersOut.indexOf(winner), 1);
        return {
          winners: winnersOut
        };
      } else {
        let winnersOut = prevState.winners.slice(0);
        winnersOut.push(player);
        return {
          winners: winnersOut
        };
      }
    })
  }

  createResult = () => {
    ResultApi.create({
      game: this.state.game._id,
      players: this.state.players,
      winner: this.state.winners,
      validated: false,
      validatedPlayers: [this.props.user]
    });
  }

  cancelResult = () => {
    this.props.cancelAction();
  }

  getStage0 = () => {
    return <View>
      <Text>Which game did you play?</Text>
      <GamePicker
        onSelectGame={this.setGame}
      />
      {this.state.game &&
        <Button
          text="Continue"
          onPress={this.goToStage1}
        />
      }
    </View>;
  }

  getStage1 = () => {
    return <View>
      <Text>Who played?</Text>
      {this.getPlayerChecklist}
      {this.state.players.length > 1 &&
        <Button
          text="Continue"
          onPress={this.goToStage2}
        />
      }
    </View>;
  }

  getStage2 = () => {
    return <View>
      <Text>Who won?</Text>
      {this.getWinnerChecklist}
      {(this.state.winners.length > 1 && this.state.winners.length < this.state.players.length) &&
        <Button
          text="Submit"
          onPress={this.createResult}
        />
      }
    </View>;
  }

  getPlayerChecklist = () => {
    let checklist = [];
    this.state.tablePlayers.forEach(player => {
      let gameElo = player.elos.find(elo => elo.game._id === this.state.game._id);
      return <View key={player._id}>
        <Checky
          value={this.state.players.includes(player._id)}
          onClick={this.togglePlayer(player._id)}
        />
        <Text>
          {player.username}
          {gameElo ? gameElo.rating : 1500}
        </Text>
      </View>
    });
    return <View>
      {checklist}
    </View>;
  }

  getWinnerChecklist = () => {
    let checklist = [];
    this.state.players.forEach(player => {
      let gameElo = this.state.tablePlayers.elos.find(elo => elo.game._id === this.state.game._id);
      return <View key={player}>
        <Checky
          value={this.state.players.includes(player)}
          onClick={this.togglePlayer(player)}
        />
        <Text>
          {this.state.tablePlayers.find(p => p === player).username}
          {gameElo ? gameElo.rating : 1500}
        </Text>
      </View>
    });
    return <View>
      {checklist}
    </View>;
  }


  render() {
    if (this.state.stage === 0) {
      return this.getStage0();
    }
    if (this.state.stage === 1) {
      return this.getStage1();
    }
    if (this.state.stage === 2) {
      return this.getStage2();
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(MakeResult);