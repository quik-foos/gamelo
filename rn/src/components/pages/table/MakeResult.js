import React, { Component } from 'react';
import {View, Text} from 'react-native';
import GamePicker from '../../ui_elems/GamePicker';
import Button from '../../ui_elems/Button';
import Checky from '../../ui_elems/Checky';

export default class MakeResult extends Component {
	constructor(props) {
    super(props);
    this.state = {
      stage: 0, // 0: which game? 1: who played? 2: who won?
      game: "",
      tablePlayers: [],
      players: [],
      winners: []
    };
  }

  componentDidMount() {
    this.fetchTablePlayers();
  }

  fetchTablePlayers = () => {

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
        return {
          players: prevState.players.slice(0).push(player)
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
        return {
          winners: prevState.winners.slice(0).push(winner)
        };
      }
    })
  }

  createResult = () => {

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
      let gameElo = player.elos.find(elo => elo.game.name === this.state.name);
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
      let gameElo = this.state.tablePlayers.elos.find(elo => elo.game.name === this.state.name);
      return <View key={player.id}>
        <Checky
          value={this.state.players.includes(player.id)}
          onClick={this.togglePlayer(player.id)}
        />
        <Text>
          {this.state.tablePlayers.username}
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