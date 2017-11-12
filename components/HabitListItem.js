import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	View,
	Text,
	Dimensions
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;


export default class HabitListItem extends Component { 

}

var styles = StyleSheet.create({
	container: {
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
		width: deviceWidth,
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
})