import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GameApi } from '../../api';


export default class GamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: "",
      enteringQuery: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await GameApi.findAll();
      const data = await response.data;
      this.setState({
        data: data
      });
    } catch {
    }
  }

  filterData = () => {
    if (this.state.query.length < 3) {
      return [];
    }
    return (this.state.data.filter(datum => {
      return datum.name.toLowerCase().replace(/\s/g, '')
        .startsWith(this.state.query.toLowerCase().replace(/\s/g, ''));
    }));
  }

  autocomplete = () => {
    return <View style={styles.autocomplete}>
      {this.filterData().map((datum, key) =>
        <TouchableOpacity key={key} onPress={() => {
          this.props.onSelectGame(datum);
          this.setState({query: datum ? datum.name: ""});
        }}>
          <Text>{datum.name}</Text>
        </TouchableOpacity>
      )}
    </View>;
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.label}
        </Text>
        <View>
          <TextInput
            value={this.state.enteringQuery ? this.state.query : (this.props.value ? this.props.value.name : null)}
            autoCorrect={false}
            onChangeText={text => {this.setState({query: text});}}
            onFocus={() => {this.setState({
              enteringQuery: true
            })}}
            onBlur={() => {setTimeout(() => {this.setState({
              enteringQuery: false,
              query: this.props.value ? this.props.value.name : ""
            })}, 50)}}
          />
          <View>
            {(this.state.query.length > 2 && this.state.enteringQuery) &&
              this.autocomplete()
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  autocomplete: {
    flex: 1,
    left: 0,
    position: 'absolute',
    backgroundColor: "#FFF",
    right: 0,
    top: 0,
    zIndex: 10
  }
});
