import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	View,
	Text,
	Dimensions
} from 'react-native';
import FadeInView from './FadeInView';
import CompletionButton from './CompletionButton';
let deviceWidth = Dimensions.get('window').width;
import util from './HabitScreenUtil';



export default class HabitListItem extends Component { 
	constructor(props) {
		super(props);

		this.state = {
			displayHabit: this.props.displayHabit,
			habit: this.props.habit,
			overlayVisible: false
		}
	}
	_returnPointValueString = util.returnPointValueString;
  	_returnDisplayInterval = util.returnDisplayInterval;

  	_onPressRow = () => {
		this.setState({overlayVisible: !this.state.overlayVisible});
	}

	render(){
		let habit = this.state.habit;
		var recentCompletions;
		if (!habit.intervals[this.state.habit.intervals.length - 1]){
			recentCompletions = [];
		} else { 
			recentCompletions = this.state.habit.intervals[this.state.habit.intervals.length - 1].completions;
		}
		let completions = [];
		let indicators = [];
		for(let i = 0; i < this.state.habit.bonusFrequency; i++) {
			var completed = (recentCompletions.length <= i) ? false : true;
			completions.push(<CompletionButton key={"CompletionButton" + habit.id + i.toString()} completed={completed} addCompletion={this.props.addCompletion} removeCompletion={this.props.removeCompletion} habit={habit}/>);
			indicators.push(<View key={"Indicator" + habit.id + i.toString()} style={[styles.indicator, completed && styles.completed]}></View>)
		}
	if(this.props.displayHabit){
		return(
			<View>
			{this.state.overlayVisible ? null :
			(<TouchableHighlight onPress={this._onPressRow}>
			<View style={styles.itemContainer}>
				<View style={styles.pointValueContainer}>
					<Text style={styles.pointValue}>{this._returnPointValueString(this.state.habit)}</Text>
			</View>
				<View style={styles.habitNameContainer}>
				<Text style={styles.habitName}>{this.state.habit.name}</Text>
				<View style={styles.indicatorRow}>
					<Text>{this._returnDisplayInterval(this.state.habit)} Bonus:</Text>{indicators}
				</View>
			</View>
			</View>
			</TouchableHighlight>
			)}
			<View>
			{this.state.overlayVisible ? 

				(
					<FadeInView style={styles.habitNameContainer}>
					<TouchableHighlight onPress={this._onPressRow}>
					<View style={styles.overlayContainer}>
					<View style={styles.topRow}>
						<Text style={styles.habitNameExpanded}>{this.state.habit.habitName}</Text>
						<View style={styles.expandedPointValueContainer}>
						<Text style={styles.pointValue}>{this._returnDisplayInterval(this.state.habit)}</Text>
						<Text style={styles.pointValue}>{this._returnPointValueString(this.state.habit)}</Text>
						</View>
					</View>
					<View style={styles.completionRow}>
						{completions}
					</View>

					<TouchableHighlight onPress={this._onPressEdit}>
						<Text style={styles.editButton}>
							Edit Habit
						</Text>
					</TouchableHighlight>
					</View>
				</TouchableHighlight>
				</FadeInView>) : null }
			</View>
			</View>
		) 
	} else {
		return null;
	}
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


