import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class App extends React.Component {
	  static navigationOptions = {
  	
  	tabBarLabel: 'Home',
  	tabBarIcon: ({tintColor, focused}) => (
  		<Ionicons
  		name={focused ? 'ios-home' : 'ios-home-outline'}
  		size={26}
  		style={{color: tintColor}}
  		/>
  	)
  }
  render() {
    return (
      <View>
        <Text>This is where the habit FORM screen will go.</Text>
      </View>
    );
  }
}