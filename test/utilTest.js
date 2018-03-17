var assert = require('assert');
var habitMock = require('./habitMock');
var moment = require('moment');
var util = require('../components/HabitScreen/HabitScreenUtil');


describe('Habit with no completions', function() {
	let habit = habitMock.noCompletions;

    it('mock should have the correct habit name', function() {
      assert.equal(habit.name, "Meditate");
    });

    describe('The last interval in the habit', function(){
	    it('should have a starting date at the beginning of the day', function() {
	    	var startOfDay = moment().startOf("day").toDate().toString();
	    	var lastInterval = habit.intervals[habit.intervals.length - 1];
	    	assert.equal(startOfDay, lastInterval.intervalStart.toString());
	    });
    })
});

describe('HabitScreenUtil', function() {
	describe('getLastInterval()', function(){
		describe('with a habit that has no completions in the last interval', function(){
			let habit = habitMock.noCompletions;
			it('should return an allComplete attribute of false', function(){
				assert.equal(util.getLastInterval(habit).allComplete, false);
			})
			it('should return an empty completions array', function(){
				assert.equal(util.getLastInterval(habit).completions.length, 0);
			})
		});
		describe('with a habit that has one completion in the last interval', function(){
			let habit = habitMock.oneCompletion;
			it('should return an allComplete attribute of false', function(){
				assert.equal(util.getLastInterval(habit).allComplete, false);
			})
			it('should return an array with one completion', function(){
				assert.equal(util.getLastInterval(habit).completions.length, 1);
			})
			it('should have the correct habit name in the completion', function(){
				assert.equal(util.getLastInterval(habit).completions[0].habitName, "Meditate");
			})
		});
		describe('with a habit that has all completions in the last interval', function(){
			let habit = habitMock.allComplete;
			it('should return an allComplete attribute of false', function(){
				assert.equal(util.getLastInterval(habit).allComplete, true);
			})
			it('should return an array with one completion', function(){
				assert.equal(util.getLastInterval(habit).completions.length, 2);
			})
			it('should have the correct habit name in the completion', function(){
				assert.equal(util.getLastInterval(habit).completions[0].habitName, "Meditate");
			})
		})

	});

	describe('getLastCompletion()', function(){
		describe('with a habit that has no completions in the last interval', function(){
			let habit = habitMock.noCompletions;
			it('should return null', function(){
				assert.equal(util.getLastCompletion(habit), null);
			});
		});
		describe('with a habit that has a completion', function(){
			let habit = habitMock.oneCompletion;
			it('should have the correct habit name in the completion', function(){
				assert.equal(util.getLastCompletion(habit).habitName, "Meditate");
			});
		})
	});

})