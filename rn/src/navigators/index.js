import React, {Component} from 'react';
import SideNavigator from './side_navigation'
import BottomNavigator from './bottom_navigation'
import StackNavigator from './stack_navigation'
import { connect } from 'react-redux';

class Navigator extends Component {
  getNavigator() {
    return this.props.username ? <BottomNavigator /> : <StackNavigator />
  }

  render() {
    return this.getNavigator()
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps)(Navigator)