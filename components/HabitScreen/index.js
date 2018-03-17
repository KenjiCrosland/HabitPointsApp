import React, { Component } from 'react';
import moment from 'moment/src/moment';
import 
{ 	View, 
	Text, 
	Button, 
	FlatList, 
	StyleSheet, 
	Dimensions,
	AsyncStorage 
} from 'react-native';
import {ButtonGroup} from 'react-native-elements'
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
	constructor(props) {
		super(props)
		let habit = this.props.habit;
		this.state = {
      selectedIndex: 0,
			data: []
		}
    this._addCompletion = this._addCompletion.bind(this);
    this._updateData = this._updateData.bind(this);
    this._loadInitialData = this._loadInitialData.bind(this);
    this._updateButtonIndex = this._updateButtonIndex.bind(this);
	}

  componentDidMount (){

    AsyncStorage.getItem("habits").then((habitKeyArray) => {
        if (habitKeyArray !== null) {
        this.setState({"habits": JSON.parse(habitKeyArray)});
        this._loadInitialData(habitKeyArray);
      } else {
        AsyncStorage.setItem("habits", "[]");
            this._updateData();

      }
    })
  }

  async _loadInitialData(habitKeyArray){

  if (habitKeyArray && habitKeyArray.length > 0) {
    let habitsArray = await AsyncStorage.multiGet(JSON.parse(habitKeyArray)) || [];
    habitsArray = habitsArray.map((habit) => {
      return JSON.parse(habit[1])
    })

    for (i in habitsArray) {
      let habit = habitsArray[i];
      if (!this._dateRangeIsCurrent(habit) && !this._hasPendingIntervals(habit)) {
        habit.intervals.push({
          id: "Interval" + Date.now().toString(),
          intervalStart: moment().startOf(habit.bonusInterval).toDate(),
          intervalEnd: moment().endOf(habit.bonusInterval).toDate(),
          snoozeEnd: moment().startOf(this.state.bonusInterval).toDate(),
          allComplete: false,
          completions:[]
        });
        await AsyncStorage.setItem(habit.key, JSON.stringify(habit));
      }
    }

    this.setState({data: habitsArray});

  }
}

  async _addCompletion (habit) {
    let completedOn = new Date();
    let currentInterval = habit.intervals[habit.intervals.length - 1];
    //Need to reference an array
    if (!habit.intervals.length || moment(currentInterval.intervalEnd).isBefore(completedOn) || currentInterval.allComplete === true){
        habit.intervals.push({
          id: "Interval" + Date.now().toString(),
          intervalStart: moment().startOf(habit.bonusInterval).toDate(),
          intervalEnd: moment().endOf(habit.bonusInterval).toDate(),
          allComplete: false,
          completions:[]
        });
    }
    if (habit.intervals.length ){
      currentInterval.completions.push({
        id: "Completion" + Date.now().toString(),
        habitId: habit.id,
        habitName: habit.name,
        completedOn: completedOn,
        pointValue: habit.pointValue
      });
      if(currentInterval.completions.length === habit.bonusFrequency) {
        currentInterval.allComplete = true;
        let nextID = habit.intervals.length + 1 + Date.now();
        let durationToAdd = moment.duration(1, habit.bonusInterval);
        habit.intervals.push({
          id: "Interval" + Date.now().toString(),
          intervalStart: moment().startOf(habit.bonusInterval).add(durationToAdd).toDate(),
          intervalEnd: moment().endOf(habit.bonusInterval).add(durationToAdd).toDate(),
          allComplete: false,
          completions:[]
        });
      }
    }
    await AsyncStorage.setItem(habit.key, JSON.stringify(habit))

    //Maybe mess with this.state.data?
    this._updateData();
  }

  _isComplete(habit) {
    //Check to see if the habit array is completed
    if (habit.intervals.length && habit.intervals[habit.intervals.length - 1].allComplete === true) {
      return true;
    } else {
      return false;
    }
  }

  _hasPendingIntervals(habit){
    let lastInterval = habit.intervals[habit.intervals.length - 1];
    if (moment(new Date).isBefore(lastInterval.intervalStart)) {
      return true;
    } else {
      return false;
    }
  }

  _dateRangeIsCurrent(habit) {
    let lastInterval = habit.intervals[habit.intervals.length - 1];
    if (moment(new Date).isBetween(lastInterval.intervalStart, lastInterval.intervalEnd)) {
      return true;
    } else {
      return false;
    }
  }

  async _updateData () {
    //TODO: NEED TO PASS habitKeyArray? Or just get it
    let habitKeyArray = await AsyncStorage.getItem("habits");
    if (habitKeyArray && habitKeyArray.length > 0) {
  	let habitsArray = await AsyncStorage.multiGet(JSON.parse(habitKeyArray)) || [];
  	habitsArray = habitsArray.map((habit) => {
  		return JSON.parse(habit[1])
  	})

  	this.setState({data: habitsArray});

  } else {
    this._loadInitialData(habitKeyArray);
  }
  }

  _displayHabit (habit) {
    if (!this._isComplete(habit) && this._dateRangeIsCurrent(habit)) {
      if (!util.isSnoozed(habit) || this.state.selectedIndex == 1){
        return true
      }
    }
    return false;
  }

  async _updateButtonIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render () {
    const buttons = ['To Do', 'Upcoming'];
    const {selectedIndex} = this.state;
    return (
      <View>
      <ButtonGroup
      onPress={this._updateButtonIndex}
      buttons={buttons}
      selectedIndex={selectedIndex}
      />
    	<FlatList
      displayMode={this.state.selectedIndex}
 			data={this.state.data}
 			 renderItem={({item, index}) => 
    
 			 <HabitListItem habit={item} addCompletion={this._addCompletion} displayHabit={this._displayHabit(item)} navigation={this.props.navigation}/>
 
 			}
    	/>
      </View>
      ) 

  } 
}