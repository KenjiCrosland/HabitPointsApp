const moment = require('moment');

function dateRangeIsCurrent(habit) {
    let lastInterval = habit.intervals[habit.intervals.length - 1];
    if (moment(new Date).isBetween(lastInterval.intervalStart, lastInterval.intervalEnd)) {
      return true;
    } else {
      return false;
    }
}

function getLastCompletion(habit) {
    let completions = getLastInterval(habit).completions;
    if (completions.length){
        return completions[completions.length - 1];
    } else {
        return null;
    }
}

function getLastInterval(habit) {
    return habit.intervals[habit.intervals.length - 1];
}

function hasPendingIntervals(habit){
    let lastInterval = habit.intervals[habit.intervals.length - 1];
    if (moment(new Date).isBefore(lastInterval.intervalStart)) {
      return true;
    } else {
      return false;
    }
  }

function isComplete(habit) {
    //Check to see if the habit array is completed
    if (habit.intervals.length && habit.intervals[habit.intervals.length - 1].allComplete === true) {
      return true;
    } else {
      return false;
    }
}

function isSnoozed(habit) {
	let completions = habit.intervals[habit.intervals.length - 1].completions.length;
	let goalInterval;
	let timeSinceStartOfInterval;
	if (habit.bonusInterval.toLowerCase() === "day") {
		 goalInterval = Math.floor(14/habit.bonusFrequency);
		 timeSinceStartOfInterval = moment().hour() - 9;
	} else if (habit.bonusInterval.toLowerCase() === "week") {
		 goalInterval = Math.floor(7/habit.bonusFrequency);
		 timeSinceStartOfInterval = moment().day() + 1;
	} else if (habit.bonusInterval.toLowerCase() === "month") {
	 goalInterval = Math.floor(moment().daysInMonth() / habit.bonusFrequency);
	 timeSinceStartOfInterval = moment().date();
	}
	return ( completions * goalInterval > timeSinceStartOfInterval);
}

function numberOfCurrentCompletions(habit) {
    return getLastInterval(habit).length;
}

function timeAfterLastCompletion(habit) {
    let lastCompletionTime = getLastCompletion(habit).completedOn;
    return moment().hour() - moment(lastCompletionTime).hour();
}

function returnPointValueString (habit) {
    return (habit.pointValue === 1) ? '1 pt' : habit.pointValue + ' Pts';
}

function returnDisplayInterval (habit) {
    let displayIntervals = {
        day: 'Daily',
        week: 'Weekly',
        month: 'Monthly'
    }
    return displayIntervals[habit.bonusInterval];
}

module.exports = {
    dateRangeIsCurrent,
    getLastCompletion,
    getLastInterval,
    hasPendingIntervals,
    isComplete,
    isSnoozed,
    numberOfCurrentCompletions,
    timeAfterLastCompletion,
    returnPointValueString,
    returnDisplayInterval
}