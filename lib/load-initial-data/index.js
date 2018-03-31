import habitUtil from '../habit-util';
import {AsyncStorage} from 'react-native';
<<<<<<< HEAD
import moment from 'moment/src/moment';

async function loadInitialData(habitKeyArray) {
=======

async function loadInitialData(habitKeyArray, component) {
>>>>>>> ee5489fcd66fe6eabcf0452b838ffff823c067bf

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
<<<<<<< HEAD
            snoozeEnd: moment().startOf(habit.bonusInterval).toDate(),
=======
            snoozeEnd: moment().startOf(component.state.bonusInterval).toDate(),
>>>>>>> ee5489fcd66fe6eabcf0452b838ffff823c067bf
            allComplete: false,
            completions:[]
          });
          await AsyncStorage.setItem(habit.key, JSON.stringify(habit));
        }
      }
<<<<<<< HEAD
      return habitsArray;
=======
  
      component.setState({data: habitsArray});
  
>>>>>>> ee5489fcd66fe6eabcf0452b838ffff823c067bf
    }
  };

  module.exports = loadInitialData;