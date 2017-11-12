import React, { Component } from 'react';
import 
{ 	View, 
	Text, 
	Button, 
	FlatList, 
	StyleSheet, 
	Dimensions 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {List, ListItem} from 'react-native-elements'
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

  	_returnPointValueString = util.returnPointValueString;
  render () {
    return (
    	<FlatList
 			data={[
 				{key: 'a', habitName: 'Drink a Glass of Water', pointValue: 1, intervalString: 'Daily'}, 
 				{key: 'b', habitName: 'Floss your teeth', pointValue: 2, intervalString: 'Weekly'}
 				]}
 			 renderItem={({item}) => 
            <View style={styles.itemContainer}>
				<View style={styles.pointValueContainer}>
					<Text style={styles.pointValue}>{this._returnPointValueString(item)}</Text>
			</View>
				<View style={styles.habitNameContainer}>
				<Text style={styles.habitName}>{item.habitName}</Text>
				<View style={styles.indicatorRow}>
					<Text>{item.intervalString} Bonus:</Text>
					<View><Text>Completions go Here</Text></View>
				</View>
			</View>
			</View>
 			}
    	/>
      ) 

  } 
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingTop: 24
	},
	listview:{
		flex: 0,
		height: 50,
		marginTop: 60,
		marginBottom: 60
	},
	listitem:{
		borderTopWidth: 1,
		borderTopColor: '#dddddd',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee'
	},

	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: 75,
		borderTopWidth: 1,
		borderTopColor: '#dddddd',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee'

	},
	overlayContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		borderTopWidth: 1,
		borderTopColor: '#dddddd',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee',
		paddingBottom: 10
	},
	topRow:{
		flex: 0,
		flexDirection: 'row',
		padding: 10,
		paddingBottom: 5,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	alignFlexStart: {
		paddingLeft: 15,
		alignSelf: 'flex-start'
	},
	pointValueContainer:{
		flex: 0,
		width: 40,
		borderRadius: 10,
		margin: 5,
		marginLeft: 10,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFBB20'
	},
	expandedPointValueContainer:{
		flex: 0,
		borderRadius: 10,
		padding: 5,
		flexDirection: 'column',
		backgroundColor: '#FFBB20'
	},
	indicator:{
		backgroundColor: '#CCCCCC',
		borderRadius: 100,
		height: 10,
		width: 10,
		margin: 2,
		justifyContent: 'center'
	},
	completed: {
		backgroundColor: '#59CC0D'
	},
	goalContainer: {
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
		padding: 5,
		width: 65,
		height: 75,
	},
	pointValue: {
		fontSize: 10,
		fontWeight: '700',
		color: '#FFFFFF',
		textAlign: 'center',
		
	},
	habitNameContainer: {
		flex: 0,
		paddingLeft: 7,
		width: deviceWidth - 42,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	habitName: {
		marginTop: 5,
		fontSize: 16,
		textAlign: 'left'
	},
	habitNameExpanded: {
		fontSize: 16,
	},
	indicatorRow: {
		flex: 0,
		marginTop: 5,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	completionRow:{
		flex: 0,
		marginTop: 5,
		marginBottom: 10,
		width: deviceWidth - 50,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	editButton:{
		color: '#E85305',
		textAlign: 'center'
	}
});
