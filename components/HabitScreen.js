import React, { Component } from 'react';
import moment from 'moment/src/moment';
import 
{ 	View, 
	Text, 
	Button, 
	FlatList, 
	StyleSheet, 
	Dimensions 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HabitListItem from './HabitListItem';
import util from './HabitScreenUtil';
let deviceWidth = Dimensions.get('window').width;

export default class HabitScreen extends Component {
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

  render () {
    return (
    	<FlatList
 			data={[{
 					key: 'a',
 					habitName: 'Drink a Glass of Water', 
 					pointValue: 1, 
 					bonusInterval: 'day', 
 					bonusFrequency: 6, 
 					snoozeActive: true, 
 					snoozeInterval: 'hour', 
 					snoozeIncrement: 1,
 					intervals: [{
 						key: 'interval-a',
 						intervalStart: moment().startOf('day').toDate(),
 						intervalEnd: moment().endOf('day').toDate(),
 						snoozeEnd: moment().startOf('day').toDate(),
 						allComplete: false,
 						completions: [
 						{key: 'completion1', 'habitId': 'a', habitName:'Drink a Glass of Water', completedOn: moment().subtract(2,'hours').toDate(), pointValue: 1}, 
						{key: 'completion2', 'habitId': 'a', habitName:'Drink a Glass of Water', completedOn: moment().subtract(1,'hours').toDate(), pointValue: 1}, 
 						]
 					}]
 				}, 
 				{
 					key: 'b',
 					habitName: 'Exercise', 
 					pointValue: 3, 
 					bonusInterval: 'week', 
 					bonusFrequency: 3, 
 					snoozeActive: true, 
 					snoozeInterval: 'day', 
 					snoozeIncrement: 1,
 					intervals: [{
 						key: 'interval-b',
 						intervalStart: moment().startOf('week').toDate(),
 						intervalEnd: moment().endOf('week').toDate(),
 						snoozeEnd: moment().startOf('day').toDate(),
 						allComplete: false,
 						completions: [
 						{key: 'completion1', 'habitId': 'a', habitName:'Exercise', completedOn: moment().subtract(2,'days').toDate(), pointValue: 3}, 
						{key: 'completion2', 'habitId': 'a', habitName:'Exercise', completedOn: moment().subtract(1,'days').toDate(), pointValue: 3}, 
 						]
 					}]
 				}]}
 			 renderItem={({item}) => 

 			 <HabitListItem habit={item} />

 			}
    	/>
      ) 

  } 
}