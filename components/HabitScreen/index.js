import React, { Component } from 'react';
import moment from 'moment/src/moment';
import {ButtonGroup} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HabitListItem from './HabitListItem';
import habitUtil from '../../lib/habit-util';
import loadInitialData from '../../lib/load-initial-data';
import 
{ View, 
	Text, 
	Button, 
	FlatList, 
	StyleSheet, 
	Dimensions,
	AsyncStorage 
} from 'react-native';

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
      displayModeIndex: 0,
			data: []
		}
    this._addCompletion = this._addCompletion.bind(this);
    this._updateData = this._updateData.bind(this);
    this._updateButtonIndex = this._updateButtonIndex.bind(this);
	}

<<<<<<< HEAD
  async componentDidMount (){
    let habitKeyArray = await AsyncStorage.getItem("habits"); 
    this.setState({"habits": JSON.parse(habitKeyArray)});
    if (habitKeyArray !== null) {
      let habitData = await loadInitialData(habitKeyArray);
      this.setState({data: habitData});
    } else {
      await  AsyncStorage.setItem("habits", "[]");
      this._updateData();
    }
=======
  componentDidMount (){
    AsyncStorage.getItem("habits").then((habitKeyArray) => {
        if (habitKeyArray !== null) {
        this.setState({"habits": JSON.parse(habitKeyArray)});
        loadInitialData(habitKeyArray, this);
      } else {
        AsyncStorage.setItem("habits", "[]");
            this._updateData();

      }
    })
>>>>>>> ee5489fcd66fe6eabcf0452b838ffff823c067bf
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
    this._updateData();
  }

  async _updateData () {
    //TODO: NEED TO PASS habitKeyArray? Or just get it
    let habitKeyArray = await AsyncStorage.getItem("habits");
    if (habitKeyArray && habitKeyArray.length > 0) {
<<<<<<< HEAD
      let habitsArray = await AsyncStorage.multiGet(JSON.parse(habitKeyArray)) || [];
      habitsArray = habitsArray.map((habit) => {
        return JSON.parse(habit[1])
      })
      this.setState({data: habitsArray});
    } else {
        loadInitialData(habitKeyArray);
    }
=======
  	let habitsArray = await AsyncStorage.multiGet(JSON.parse(habitKeyArray)) || [];
  	habitsArray = habitsArray.map((habit) => {
  		return JSON.parse(habit[1])
  	})

  	this.setState({data: habitsArray});

  } else {
    loadInitialData(habitKeyArray, this);
  }
>>>>>>> ee5489fcd66fe6eabcf0452b838ffff823c067bf
  }

  _displayHabit (habit) {
    if (!habitUtil.isComplete(habit) && habitUtil.dateRangeIsCurrent(habit)) {
      if (!habitUtil.isSnoozed(habit) || this.state.displayModeIndex == 1){
        return true
      }
    }
    return false;
  }

  _updateButtonIndex(displayModeIndex) {
    this.setState({displayModeIndex});
  }

  render () {
    const buttons = ['To Do', 'Upcoming'];
    const {displayModeIndex} = this.state;
    return (
      <View>
        <ButtonGroup
          onPress={this._updateButtonIndex}
          buttons={buttons}
          selectedIndex={displayModeIndex} />
        <FlatList
          displayMode={this.state.displayModeIndex}
          data={this.state.data}
          renderItem={({item, index}) => 
            <HabitListItem habit={item} addCompletion={this._addCompletion} displayHabit={this._displayHabit(item)} navigation={this.props.navigation} />
          } />
      </View>
      ) 
  } 
}