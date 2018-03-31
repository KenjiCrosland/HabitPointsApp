import _ from 'lodash';
import moment from 'moment/src/moment';

async function buildStatsObj(habitData) {
    let todayTotal =  getTotalPointsByInterval(habitData, 'day');
    let thisWeekTotal = getTotalPointsByInterval(habitData, 'week');
    let thisMonthTotal = getTotalPointsByInterval(habitData, 'month');
    let allTimeTotal = getTotalPointsByInterval(habitData, 'allTime');
    let averagePointsAllTime = getAveragePointsByInterval(habitData, 'allTime');
    let averagePointsThisWeek =  getAveragePointsByInterval(habitData, 'week');
    let averagePointsThisMonth = getAveragePointsByInterval(habitData, 'month');
    let todayVsAllTimeAvg = todayTotal - averagePointsAllTime;
    let todayVsThisWeekAvg = todayTotal - averagePointsThisWeek;
    let todayVsThisMonthAvg = todayTotal - averagePointsThisMonth;

    return {
        todayTotal: todayTotal,
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

function getTotalPointsByInterval(habits, interval) {
    let total = 0;
    let completions = getAllCompletionsByInterval(habits, interval);
    completions.forEach((completion) => total += completion.pointValue);
    return total;
}

function getAllCompletionsByInterval(habits, interval) {
    let allCompletions = getAllCompletions(habits);
    let completions = interval === 'allTime' ? allCompletions :
        allCompletions.filter((completion) => moment(completion.completedOn)
        .isBetween(moment().startOf(interval), moment().endOf(interval)));
    return completions;    
}

function getAveragePointsByInterval(habits, interval) {
    let firstInterval = getAllCompletionsByInterval(habits, interval)
            .map((completion) => completion.completedOn)
            .reduce((previousValue, currentValue) => {
                return moment(previousValue).isBefore(currentValue) ? previousValue : currentValue 
            });
                     
    let totalDays = moment().diff(moment(firstInterval), 'days') + 1;
    //console.log(`${totalDays} ${interval}`);
    let total = getTotalPointsByInterval(habits, interval);
    console.log(`${total} ${interval}`)
    return Math.floor(total / totalDays);
}

function getAllCompletions(habits) {
    return _.flatMap(habits, (habit) => _.flatMap(habit.intervals, (interval) => interval.completions));
}


module.exports = buildStatsObj;
