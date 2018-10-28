import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, Button } from 'react-native';
import moment from 'moment/src/moment';
import { ButtonGroup } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HabitListItem from './HabitListItem';
import habitUtil from '../../lib/habit-util';
import loadInitialData from '../../lib/load-initial-data';


export default class HabitScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <Button title="New Habit" onPress={() => navigation.navigate('HabitFormScreen')} />
    ),
  });
  constructor(props) {
    super(props);
    this.state = {
      displayModeIndex: 0,
      data: [],
      scrollEnabled: true,
    };
    this._addCompletion = this._addCompletion.bind(this);
    this._updateData = this._updateData.bind(this);
    this._updateButtonIndex = this._updateButtonIndex.bind(this);
    this._setScrollEnabled = this._setScrollEnabled.bind(this);
  }

  async componentWillMount() {
    const habitKeyArray = await AsyncStorage.getItem('habits');
    if (habitKeyArray !== null) {
      const habitData = await loadInitialData(habitKeyArray);
      this.setState({ data: habitData });
    } else {
      await AsyncStorage.setItem('habits', '[]');
      this._updateData();
    }
  }

  async _addCompletion(habit) {
    const completedOn = new Date();
    const currentInterval = habit.intervals[habit.intervals.length - 1];
    // Need to reference an array
    if (
      !habit.intervals.length ||
      moment(currentInterval.intervalEnd).isBefore(completedOn) ||
      currentInterval.allComplete === true
    ) {
      habit.intervals.push({
        id: `Interval${Date.now().toString()}`,
        intervalStart: moment()
          .startOf(habit.bonusInterval)
          .toDate(),
        intervalEnd: moment()
          .endOf(habit.bonusInterval)
          .toDate(),
        allComplete: false,
        completions: [],
      });
    }
    if (habit.intervals.length) {
      currentInterval.completions.push({
        id: `Completion${Date.now().toString()}`,
        habitId: habit.id,
        habitName: habit.name,
        completedOn,
        pointValue: habit.pointValue,
      });
      if (currentInterval.completions.length === habit.bonusFrequency) {
        currentInterval.allComplete = true;
        const durationToAdd = moment.duration(1, habit.bonusInterval);
        habit.intervals.push({
          id: `Interval${Date.now().toString()}`,
          intervalStart: moment()
            .startOf(habit.bonusInterval)
            .add(durationToAdd)
            .toDate(),
          intervalEnd: moment()
            .endOf(habit.bonusInterval)
            .add(durationToAdd)
            .toDate(),
          allComplete: false,
          completions: [],
        });
      }
    }
    await AsyncStorage.setItem(habit.key, JSON.stringify(habit));
    this._updateData();
  }

  async _updateData() {
    const habitKeyArray = await AsyncStorage.getItem('habits');
    if (habitKeyArray && habitKeyArray.length > 0) {
      let habitsArray = (await AsyncStorage.multiGet(JSON.parse(habitKeyArray))) || [];
      habitsArray = habitsArray.map(habit => JSON.parse(habit[1]));
      this.setState({ data: habitsArray });
    } else {
      loadInitialData(habitKeyArray);
    }
  }

  _setScrollEnabled(enabled) {
    this.setState({
      scrollEnabled: enabled,
    });
  }

  _displayHabit(habit) {
    if (!habitUtil.isComplete(habit) && habitUtil.dateRangeIsCurrent(habit)) {
      if (!habitUtil.isSnoozed(habit) || this.state.displayModeIndex === 1) {
        return true;
      }
    }
    return false;
  }

  _updateButtonIndex(displayModeIndex) {
    this.setState({ displayModeIndex });
  }

  render() {
    const buttons = ['To Do', 'Upcoming'];
    const { displayModeIndex } = this.state;
    return (
      <View>
        <ButtonGroup
          onPress={this._updateButtonIndex}
          buttons={buttons}
          selectedIndex={displayModeIndex}
        />
        <FlatList
          displayMode={this.state.displayModeIndex}
          data={this.state.data}
          scrollEnabled={this.state.scrollEnabled}
          renderItem={({ item }) => (
            <HabitListItem
              habit={item}
              addCompletion={this._addCompletion}
              displayIndex={this.state.displayModeIndex}
              setScrollEnabled={this._setScrollEnabled}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    );
  }
}
