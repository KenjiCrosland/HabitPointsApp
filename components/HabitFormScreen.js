import moment from 'moment/src/moment';
import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Dimensions,
	View,
	AsyncStorage,
	Text
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import { NavigationActions } from 'react-navigation'
import PointPicker from './PointPicker';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import IntervalPicker from './IntervalPicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
	constructor(props) {
		super(props)
		let habit = this.props.habit;
		this.state = {
			habits: [],
			habitName: habit ? habit.name : "",
			description: habit ? habit.description : "",
			pointValue: habit ? habit.pointValue.toString() : "1",
			bonusInterval: habit ? habit.bonusInterval : 'day',
			bonusFrequency: habit ? habit.bonusFrequency.toString() : "1",
			snoozeActive: habit ? habit.snoozeActive : true,
			snoozeInterval: habit ? habit.snoozeInterval : 'hour',
			snoozeIncrement: habit ? habit.snoozeIncrement.toString() : "1"
		}
	}
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

	// const backAction = NavigationActions.back({
	//   key: null
	// })

  componentDidMount (){
  	AsyncStorage.getItem("habits").then((value) => {
  			if (value !== null) {
				console.log(value);
				console.log("retrieved!");
				this.setState({"habits": JSON.parse(value)});
				if (Array.isArray(this.state.habits)) {
					console.log("It's an array")
				}	
			} else {
				AsyncStorage.setItem("habits", "[]");
			}
  	})
  }

  	_incrementFrequency = () => {
		var num = parseInt(this.state.bonusFrequency);
		if (num < 7){
			this.setState({bonusFrequency: (num + 1).toString() })
		}
	}
	_decrementFrequency= () => {
		var num = parseInt(this.state.bonusFrequency);
		if (num > 1){
			this.setState({bonusFrequency: (num - 1).toString() })
		}
	}
  	_pickPointValue = (num) => {
		dismissKeyboard();
		num = num.toString()
		this.setState({pointValue: num});
	}

	_pickIntervalValue = (interval) => {
		dismissKeyboard();
		this.setState({bonusInterval: interval})
	}

	_incrementHabitId = (habits) => {
		if (habits.length) {
			return habits.length + 1;
		} else {
			return 1;
		}
	}

	async _saveHabit(habit) {
		let newHabitID = habit.key;
		let habitArray = this.state.habits.slice();
		let newInterval = 
		habitArray.push(newHabitID);
		this.setState({habits: [...this.state.habits, ...habitArray]});
		console.log(this.state.habits);
		await AsyncStorage.setItem(newHabitID, JSON.stringify(habit));
		await AsyncStorage.setItem("habits", JSON.stringify(habitArray));
		// if (!this.props.habit) {
		// 	await AsyncStorage.setItem(habit.intervals[0], JSON.stringify(newInterval))
		// }
		this.props.navigation.navigate('HabitScreen');
		//Next use event emitters to refresh or is there a hook?
		//The answer is here https://github.com/react-community/react-navigation/issues/922
	}

	_onPressButton = () => {
			let newHabitID = "habit" + Date.now().toString();

			let habit = this.props.habit || {
					key: newHabitID,
					name: this.state.habitName,
					description: this.state.description,
					pointValue: parseInt(this.state.pointValue),
					bonusInterval: this.state.bonusInterval,
					bonusFrequency: parseInt(this.state.bonusFrequency),
					snoozeActive: this.state.snoozeActive,
					snoozeInterval: this.state.snoozeInterval,
					snoozeIncrement: parseInt(this.state.snoozeIncrement)
				};
			if(this.props.habit) {
				habit.key = this.state.key;
				habit.name = this.state.habitName;
				habit.description = this.state.description;
				habit.pointValue = parseInt(this.state.pointValue);
				habit.bonusInterval = this.state.bonusInterval;
				habit.bonusFrequency = parseInt(this.state.bonusFrequency);
				habit.snoozeActive = this.state.snoozeActive;
				habit.snoozeInterval = this.state.snoozeInterval;
				habit.snoozeIncrement = parseInt(this.state.snoozeIncrement);
			}
			if (!this.props.habit) {
				habit.intervals = [{
					key: "Interval" + Date.now().toString(),
					intervalStart: moment().startOf(this.state.bonusInterval).toDate(),
					intervalEnd: moment().endOf(this.state.bonusInterval).toDate(),
					snoozeEnd: moment().startOf(this.state.bonusInterval).toDate(),
					allComplete: false,
					completions: [] 
				}];
			}
			this._saveHabit(habit);
	}
  render() {

  	let intervals = ['day', 'week', 'month'];
    return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
		<View>
			<Text>Habit Name:</Text>
			 <TextInput
			    style={styles.input}
			    placeholder="Ex: Washing my dog"
			    onChangeText={(text) => this.setState({habitName: text})}
			    value={this.state.habitName}
	  		/>
	  	</View>
	  	<View>
	  		<Text>Description:</Text>
	  		<TextInput
	  			style={styles.textArea}
	  			multiline={true}
			    placeholder="Your description goes here"
			    onChangeText={(text) => this.setState({description: text})}
			    value={this.state.description}
	  		/>
	  	</View>
	  	<View>
	  	    <Text>Point Value:</Text>
	  		<PointPicker 
	  		numberOfButtons={7} 
	  		currentPointValue={parseInt(this.state.pointValue)} 
	  		pickPointValue={this._pickPointValue} />
	  	</View>
	  	<View>
	  		<Text>Frequency:</Text>
	  		<View style={styles.fieldset}>
		  		<View style={styles.incrementer}>
			  		<TouchableHighlight onPress={this._incrementFrequency}>
				      <Text style={styles.centerText}>+</Text>
				    </TouchableHighlight>
					 <TextInput
					    style={[styles.input, styles.numeric]}
					    keyboardType="numeric"
					    placeholder={this.state.bonusFrequency}
					    onChangeText={(num) => this.setState({bonusFrequency: num})}
					    value={this.state.bonusFrequency}
			  		/>
			  		<TouchableHighlight onPress={this._decrementFrequency}>
				      <Text style={styles.centerText}>-</Text>
				    </TouchableHighlight>
		  		</View>
		  		<Text style={{fontSize: 16, padding: 5}}>Times a </Text>
		  		<IntervalPicker 
		  		currentInterval={this.state.bonusInterval}
		  		pickerType={"wideCirclePicker"}
		  		pickIntervalValue={this._pickIntervalValue}
		  		intervalArray={['day', 'week', 'month']}
		  		/>
		  	</View>
		</View>
	  <TouchableHighlight onPress={this._onPressButton}>
		    <Text>Submit Habit!</Text>
	  </TouchableHighlight>
      </View>



    </TouchableWithoutFeedback>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth - 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  picker: {
    width: 100,
  },
  fieldset: {
  	flex: 0,
  	width: deviceWidth - 20,
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	alignItems: 'center'
  },
  incrementer: {
  	flexDirection: 'column'
  },
  centerText: {
  	textAlign: 'center'
  },
  numeric: {
  	width: 25,
  },
  textArea: {
  	height: 60,
  	width: deviceWidth - 20, 
  	borderColor: 'gray', 
  	borderWidth: 1
  },
  input: {
  	textAlign: 'center',
  	height: 35,
  	width: deviceWidth - 20, 
  	borderColor: 'gray', 
  	borderWidth: 1
  }
  });