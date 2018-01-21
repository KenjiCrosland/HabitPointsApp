export default util = {
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
}