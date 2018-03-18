import habitUtil from '../habit-util';
import {AsyncStorage} from 'react-native';

async function loadInitialData(habitKeyArray, component) {

    if (habitKeyArray && habitKeyArray.length > 0) {
      let habitsArray = await AsyncStorage.multiGet(JSON.parse(habitKeyArray)) || [];
      habitsArray = habitsArray.map((habit) => {
        return JSON.parse(habit[1])
      })
  
      for (i in habitsArray) {
        let habit = habitsArray[i];
        if (!habitUtil.dateRangeIsCurrent(habit) && !habitUtil.hasPendingIntervals(habit)) {
          habit.intervals.push({
            id: "Interval" + Date.now().toString(),
            intervalStart: moment().startOf(habit.bonusInterval).toDate(),
            intervalEnd: moment().endOf(habit.bonusInterval).toDate(),
            snoozeEnd: moment().startOf(component.state.bonusInterval).toDate(),
            allComplete: false,
            completions:[]
          });
          await AsyncStorage.setItem(habit.key, JSON.stringify(habit));
        }
      }
  
      component.setState({data: habitsArray});
  
    }
  };

  module.exports = loadInitialData;