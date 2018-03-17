let moment = require('moment');

function getLastInterval(habit) {
 return habit.intervals[habit.intervals.length - 1];
}

function getLastCompletion(habit) {
	let completions = getLastInterval(habit).completions;
	if (completions.length){
		return completions[completions.length - 1];
	} else {
		return null;
	}
}

function timeAfterLastCompletion(habit) {
	let lastCompletionTime = getLastCompletion(habit).completedOn;
	return moment().hour() - moment(lastCompletionTime).hour();
}

let numberOfCurrentCompletions = function(habit) {
	return getLastInterval(habit).length;
}

let isSnoozed = function(habit) {
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



module.exports = {
	getLastInterval: getLastInterval,
	getLastCompletion: getLastCompletion,
	timeAfterLastCompletion: timeAfterLastCompletion,
	numberOfCurrentCompletions: numberOfCurrentCompletions,
	isSnoozed: isSnoozed,

	returnPointValueString: (habit) => {
		if(habit.pointValue === 1){
			return '1 Pt';
		}
		return habit.pointValue + ' Pts';
	},

	returnDisplayInterval: (habit) => {
		switch(habit.bonusInterval){
			case 'day':
				return 'Daily';
			case 'week':
				return 'Weekly';
			case 'month':
				return 'Monthly';
			default:
				return 'Daily';
		}
	}

    /* Case: Day with three completions

    Current time: 12:01
    Number of completions: 1
    Time completed: 11:30

    Divide hours in the day by 3 and round down.
    Add the number you get from the wake up time:

    So add 4 hours:

    9:00---Interval 1----1:00---Interval 2-----5:00------Interval 3-----Days End

    Find the the period of time and add it from the starting time:

    11:30 is 2.5 hours after nine, so not even one interval of 4 hours has passed. We can snooze

    Find total number of hours after latest completion. If (number of completions times the interval) is less than current time. Then snooze.

    */




    //Get Habit interval and divide by number of times we need before it's complete
    //Math.floor(interval in hours for a day / number of times)
    //Wakeup time + whatever that number 
    // If last completion is before the next time and so is the current time, don't show the habit
    // However if the current time is after that next time then the 

}