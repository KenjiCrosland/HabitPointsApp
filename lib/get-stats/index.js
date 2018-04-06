import _ from 'lodash';
import moment from 'moment/src/moment';

async function buildStatsObj(habitData, desiredInterval, desiredIntervalType) {
    //Total points for the day doesn't seem right when subtracting a day.
    let thisIntervalTotal =  getTotalPointsByInterval(habitData, desiredInterval, desiredIntervalType);
    let thisWeekTotal = getTotalPointsByInterval(habitData, desiredInterval, 'week');
    let thisMonthTotal = getTotalPointsByInterval(habitData, desiredInterval, 'month');
    let allTimeTotal = getTotalPointsByInterval(habitData, desiredInterval, 'allTime');
    let averagePointsAllTime = getAveragePointsByInterval(habitData, desiredInterval, 'allTime');
    let averagePointsThisWeek =  getAveragePointsByInterval(habitData, desiredInterval, 'week');
    let averagePointsThisMonth = getAveragePointsByInterval(habitData, desiredInterval, 'month');
    let todayVsAllTimeAvg = thisIntervalTotal - averagePointsAllTime;
    let todayVsThisWeekAvg = thisIntervalTotal - averagePointsThisWeek;
    let todayVsThisMonthAvg = thisIntervalTotal - averagePointsThisMonth;

    return {
        thisIntervalTotal: thisIntervalTotal,
        thisWeekTotal: thisWeekTotal,
        thisMonthTotal:  thisMonthTotal,
        allTimeTotal: allTimeTotal,
        averagePointsAllTime: averagePointsAllTime,
        averagePointsThisWeek: averagePointsThisWeek,
        averagePointsThisMonth: averagePointsThisMonth,
        todayVsAllTimeAvg: todayVsAllTimeAvg,
        todayVsThisWeekAvg: todayVsThisWeekAvg,
        todayVsThisMonthAvg: todayVsThisMonthAvg
    }
}

function getTotalPointsByInterval(habits, desiredInterval, desiredIntervalType) {
    let total = 0;
    let completions = getAllCompletionsByInterval(habits, desiredInterval, desiredIntervalType);
    completions.forEach((completion) => total += completion.pointValue);
    return total;
}

function getAllCompletionsByInterval(habits, desiredInterval, desiredIntervalType) {
    let allCompletions = getAllCompletions(habits);
    let completions = desiredIntervalType === 'allTime' ? allCompletions :
        allCompletions.filter((completion) => moment(completion.completedOn)
        .isBetween(moment(desiredInterval).startOf(desiredIntervalType), moment(desiredInterval).endOf(desiredIntervalType)));
    return completions;    
}

function getAveragePointsByInterval(habits, desiredInterval, desiredIntervalType) {
    let allCompletions = getAllCompletionsByInterval(habits, desiredInterval, desiredIntervalType);
    if (allCompletions.length === 0) { return 0 };
    let firstInterval = allCompletions.map((completion) => completion.completedOn)
        .reduce((previousValue, currentValue) => {
            return moment(previousValue).isBefore(currentValue) ? previousValue : currentValue 
        });
    let totalDays = moment(desiredInterval).diff(moment(firstInterval), 'days') + 1;
    let total = getTotalPointsByInterval(habits, desiredInterval, desiredIntervalType);
    return Math.floor(total / totalDays);
}

function getAllCompletions(habits) {
    return _.flatMap(habits, (habit) => _.flatMap(habit.intervals, (interval) => interval.completions));
}


module.exports = buildStatsObj;
