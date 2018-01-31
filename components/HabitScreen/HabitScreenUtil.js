function timeAfterLastCompletion(habit) {
	return "Hello";
}



module.exports  = {
	timeAfterLastCompletion: timeAfterLastCompletion,

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
	},

	isSnoozed: (habit) => {
    let timeAfterLastCompletion;
    let numberOfCurrentCompetions;
    let completionGoalTime;

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
}