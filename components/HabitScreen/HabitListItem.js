import React, { PureComponent } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Animated,
	View,
	Text,
	Dimensions
} from 'react-native';
import Swipeable from '../Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FadeInView from './FadeInView';
import CompletionButton from './CompletionButton';
let deviceWidth = Dimensions.get('window').width;
import habitUtil from '../../lib/habit-util';

export default class HabitListItem extends PureComponent { 
	containerHeight = new Animated.Value(80);

	constructor(props) {
		super(props);

		this.state = {
			displayHabit: this.props.displayHabit,
			hidden: false,
			habit: this.props.habit,
			overlayVisible: false,
		}
	}
	componentWillMount() {
		this.setState({hidden:false})
	}
  	_onPressRow = () => {
		this.setState({overlayVisible: !this.state.overlayVisible});
	}
	_onPressEdit = () => {
		this.props.navigation.navigate('HabitFormScreen', {habit: this.props.habit});
	}
	_hideHabit = () =>{
		Animated.timing(this.containerHeight, {
			toValue: 0 
		}).start(()=>{
			this.setState({hidden: true});
		});
	}

	_displayHabit (habit) {
		if (!habitUtil.isComplete(habit) && habitUtil.dateRangeIsCurrent(habit) && !this.state.hidden) {
		  if (!habitUtil.isSnoozed(habit) || this.props.displayIndex == 1){
			return true
		  }
		}
		return false;
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
	if(this._displayHabit(habit)){
		return(
			<View>
			{this.state.overlayVisible ? null :
			(<Swipeable onPress={this._onPressRow} setScrollEnabled={this.props.setScrollEnabled} addCompletion={this.props.addCompletion} hideHabit={this._hideHabit} habit={this.state.habit}>
				<Animated.View style={[styles.itemContainer, {height: this.containerHeight}]}>
					<View style={styles.pointValueContainer}>
						<Text style={styles.pointValue}>{habitUtil.returnPointValueString(this.state.habit)}</Text>
					</View>
					<View style={styles.habitNameContainer}>
						<Text style={styles.habitName}>{this.state.habit.name}</Text>
						<View style={styles.indicatorRow}>
							<Text>{habitUtil.returnDisplayInterval(this.state.habit)} Bonus:</Text>{indicators}
						</View>
					</View>
				</Animated.View>
			</Swipeable>
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
						<Text style={styles.pointValue}>{habitUtil.returnDisplayInterval(this.state.habit)}</Text>
						<Text style={styles.pointValue}>{habitUtil.returnPointValueString(this.state.habit)}</Text>
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
	leftSwipeItem: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
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


