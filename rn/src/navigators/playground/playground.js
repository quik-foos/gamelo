import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation'
import Home from '../../components/pages/home/Home.js'
import React from 'react'
import { View, Text, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PlaygroundNested from './PlaygroundNested'

const BottomLeft = ({ navigation }) => {
  return (
    <View>
      <Text>Bottom LEFT</Text>
      <Button
        style={{ width: '50%' }}
        title="navigate"
        onPress={() => {
          navigation.navigate('Register')
        }}
      />
    </View>
  )
}

const BottomRight = () => {
  return (
    <View>
      <Text>Bottom Right</Text>
    </View>
  )
}

const BottomCenter = () => {
  return (
    <View>
      <Text>Bottom Center</Text>
    </View>
  )
}

const BottomAppNavigator = createMaterialTopTabNavigator(
  {
    Screen1: {
      screen: BottomLeft,
      navigationOptions: {
        title: 'Left'
      }
    },
    Screen2: {
      screen: BottomCenter,
      navigationOptions: {
        title: 'Center'
      }
    },
    Screen3: {
      screen: BottomRight,
      navigationOptions: {
        title: 'Right'
      }
    }
  },
  {
    initialRouteName: 'Screen1',
    tabBarOptions: {
      showIcon: false,
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: 'grey'
      },
      activeTintColor: '#066',
      inactiveTintColor: 'grey',
      showIcon: true
    }
  }
)

//   export default AppContainer = createAppContainer(BottomAppNavigator)

const Register = ({ navigation }) => {
  return (
    <View>
      <Text>Bottom LEFT</Text>
      <Button
        style={{ width: 100 }}
        title="navigate to Home"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
      <Button
        style={{ width: 100 }}
        title="navigate to Nested"
        onPress={() => {
          navigation.navigate('Nested')
        }}
      />
    </View>
  )
}

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomAppNavigator,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: 'Register'
      }
    },
    Nested: {
      screen: PlaygroundNested,
      navigationOptions: {
        title: 'Nested Component'
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)

export default AppContainer = createAppContainer(StackNavigator)
