import moment from 'moment/src/moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  AsyncStorage,
  Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PointPicker from '../PointPicker';
import IntervalPicker from '../IntervalPicker';

const deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };

  constructor(props) {
    super(props);
    const habit = this.props.navigation.state.params
      ? this.props.navigation.state.params.habit
      : null;

    this.state = {
      habits: [],
      key: habit ? habit.key : '',
      habitName: habit ? habit.name : '',
      description: habit ? habit.description : '',
      pointValue: habit ? habit.pointValue.toString() : '1',
      bonusInterval: habit ? habit.bonusInterval : 'day',
      bonusFrequency: habit ? habit.bonusFrequency.toString() : '1',
      snoozeActive: habit ? habit.snoozeActive : true,
      snoozeInterval: habit ? habit.snoozeInterval : 'hour',
      snoozeIncrement: habit ? habit.snoozeIncrement.toString() : '1',
    };
  }

  componentWillMount() {
    const existingHabit = this.props.navigation.state.params
      ? this.props.navigation.state.params.habit
      : null;
    this.setState({ existingHabit });
    AsyncStorage.getItem('habits').then((value) => {
      if (value !== null) {
        this.setState({ habits: JSON.parse(value) });
      } else {
        AsyncStorage.setItem('habits', '[]');
      }
    });
  }

  _incrementFrequency = () => {
    const num = parseInt(this.state.bonusFrequency, 10);
    if (num < 7) {
      this.setState({ bonusFrequency: (num + 1).toString() });
    }
  };
  _decrementFrequency = () => {
    const num = parseInt(this.state.bonusFrequency, 10);
    if (num > 1) {
      this.setState({ bonusFrequency: (num - 1).toString() });
    }
  };
  _pickPointValue = (num) => {
    dismissKeyboard();
    this.setState({ pointValue: num.toString() });
  };

  _pickIntervalValue = (interval) => {
    dismissKeyboard();
    this.setState({ bonusInterval: interval });
  };

  _incrementHabitId = (habits) => {
    if (habits.length) {
      return habits.length + 1;
    }
    return 1;
  };

  async _saveHabit(habit) {
    const newHabitID = habit.key;
    const habitArray = this.state.habits.slice();
    if (this.state.existingHabit) {
      await AsyncStorage.mergeItem(newHabitID, JSON.stringify(habit));
    } else {
      await AsyncStorage.setItem(newHabitID, JSON.stringify(habit));
      habitArray.push(newHabitID);
    }
    await AsyncStorage.setItem('habits', JSON.stringify(habitArray));
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HabitScreen' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _onPressButton = () => {
    const newHabitID = `habit${Date.now().toString()}`;

    const habit = this.props.habit || {
      key: newHabitID,
      name: this.state.habitName,
      description: this.state.description,
      pointValue: parseInt(this.state.pointValue, 10),
      bonusInterval: this.state.bonusInterval,
      bonusFrequency: parseInt(this.state.bonusFrequency, 10),
      snoozeActive: this.state.snoozeActive,
      snoozeInterval: this.state.snoozeInterval,
      snoozeIncrement: parseInt(this.state.snoozeIncrement, 10),
    };
    if (this.state.existingHabit) {
      habit.key = this.state.key;
      habit.name = this.state.habitName;
      habit.description = this.state.description;
      habit.pointValue = parseInt(this.state.pointValue, 10);
      habit.bonusInterval = this.state.bonusInterval;
      habit.bonusFrequency = parseInt(this.state.bonusFrequency, 10);
      habit.snoozeActive = this.state.snoozeActive;
      habit.snoozeInterval = this.state.snoozeInterval;
      habit.snoozeIncrement = parseInt(this.state.snoozeIncrement, 10);
    }
    if (!this.state.existingHabit) {
      habit.intervals = [
        {
          key: `Interval${Date.now().toString()}`,
          intervalStart: moment()
            .startOf(this.state.bonusInterval)
            .toDate(),
          intervalEnd: moment()
            .endOf(this.state.bonusInterval)
            .toDate(),
          snoozeEnd: moment()
            .startOf(this.state.bonusInterval)
            .toDate(),
          allComplete: false,
          completions: [],
        },
      ];
    }
    this._saveHabit(habit);
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View>
            <Text>Habit Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Washing my dog"
              onChangeText={text => this.setState({ habitName: text })}
              value={this.state.habitName}
            />
          </View>
          <View>
            <Text>Description:</Text>
            <TextInput
              style={styles.textArea}
              multiline
              placeholder="Your description goes here"
              onChangeText={text => this.setState({ description: text })}
              value={this.state.description}
            />
          </View>
          <View>
            <Text>Point Value:</Text>
            <PointPicker
              numberOfButtons={7}
              currentPointValue={parseInt(this.state.pointValue, 10)}
              pickPointValue={this._pickPointValue}
            />
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
                  onChangeText={num => this.setState({ bonusFrequency: num })}
                  value={this.state.bonusFrequency}
                />
                <TouchableHighlight onPress={this._decrementFrequency}>
                  <Text style={styles.centerText}>-</Text>
                </TouchableHighlight>
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>Times a </Text>
              <IntervalPicker
                currentInterval={this.state.bonusInterval}
                pickerType="wideCirclePicker"
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth - 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  picker: {
    width: 100,
  },
  fieldset: {
    flex: 0,
    width: deviceWidth - 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  incrementer: {
    flexDirection: 'column',
  },
  centerText: {
    textAlign: 'center',
  },
  numeric: {
    width: 25,
  },
  textArea: {
    height: 60,
    width: deviceWidth - 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    textAlign: 'center',
    height: 35,
    width: deviceWidth - 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
