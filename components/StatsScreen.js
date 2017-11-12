import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class StatsScreen extends Component {
  static navigationOptions = {
  	tabBarLabel: 'Stats',
  	tabBarIcon: ({tintColor, focused}) => (
  		<Ionicons
  		name={focused ? 'ios-stats' : 'ios-stats-outline'}
  		size={26}
  		style={{color: tintColor}}
  		/>
  		)
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Stats Screen</Text>
      </View>
      ) 

  } 
}
