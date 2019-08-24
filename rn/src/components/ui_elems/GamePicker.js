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
      const data = await GameApi.findAll();
      this.setState({
        data: data.data.map(datum => datum.name)
      });
    } catch {
    }
  }

  filterData = () => {
    if (this.state.query.length < 3) {
      return [];
    }
    return (this.state.data.filter(datum => {
      return datum.toLowerCase().replace(/\s/g, '')
        .startsWith(this.state.query.toLowerCase().replace(/\s/g, ''));
    }));
  }

  renderItem = (item, i) => (
    <TouchableOpacity key={i} onPress={() => {
      console.log("selected", item)
      this.props.onSelectGame(item);
      this.setState({query: item});
      }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  autocomplete = () => {
    return <View style={styles.autocomplete}>
      {this.autocompleteOptions()}
    </View>
  }

  autocompleteOptions = () => {
    return (this.filterData().map(this.renderItem));
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>
          {this.props.label}
        </Text>
        <View>
          <TextInput
            value={this.state.enteringQuery ? this.state.query : this.props.value}
            autoCorrect={false}
            onChangeText={text => {this.setState({query: text});}}
            onFocus={() => {this.setState({
              enteringQuery: true
            })}}
            onBlur={() => {this.setState({
              enteringQuery: false,
              query: this.props.value
            })}}
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
    zIndex: 1
  }
});
