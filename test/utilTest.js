var assert = require('assert');
var habitMock = require('./habitMock');
var moment = require('moment');
var util = require('../components/HabitScreen/HabitScreenUtil')

describe('Habit mock', function() {
    it('should have the correct habit name', function() {
      assert.equal(habitMock.name, "Meditate");
    });

    describe('The last interval in the habit', function(){
	    it('should have a starting date at the beginning of the day', function() {
	    	var startOfDay = moment().startOf("day").toDate().toString();
	    	var lastInterval = habitMock.intervals[habitMock.intervals.length - 1];
	    	assert.equal(startOfDay, lastInterval.intervalStart.toString());
	    });
    })
});

describe('HabitScreenUtil', function() {
	it('Habit util is working', function(){
		assert.equal(util.timeAfterLastCompletion(), "Hello");
	})
})