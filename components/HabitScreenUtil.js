export default util = {
	returnPointValueString: (habit) => {
		if(habit.pointValue === 1){
			return '1 Pt';
		}
		return habit.pointValue + ' Pts';
	}
}