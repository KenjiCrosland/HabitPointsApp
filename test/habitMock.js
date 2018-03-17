var moment = require('moment');

let noCompletions = {
     "bonusFrequency": 2,
     "bonusInterval": "day",
     "description": "",
     "intervals": [
       {
         "allComplete": false,
         "completions": [],
         "intervalEnd": "2018-01-20T07:59:59.999Z",
         "intervalStart": "2018-01-19T08:00:00.000Z",
         "key": "Interval1516418925315",
         "snoozeEnd": "2018-01-19T08:00:00.000Z",
       },
       {
         "allComplete": false,
         "completions": [],
         "id": "Interval1516494264502",
         "intervalEnd": moment().endOf("day").toDate(),
         "intervalStart": moment().startOf("day").toDate(),
         "snoozeEnd": "2018-01-21T00:24:24.504Z",
       },
     ],
     "key": "habit1516418925315",
     "name": "Meditate",
     "pointValue": 2,
     "snoozeActive": true,
     "snoozeIncrement": 1,
     "snoozeInterval": "hour",
}


let oneCompletion  =  {
     "bonusFrequency": 2,
     "bonusInterval": "day",
     "description": "",
     "intervals":  [
       {
         "allComplete": false,
         "completions":  [],
         "intervalEnd": "2018-01-20T07:59:59.999Z",
         "intervalStart": "2018-01-19T08:00:00.000Z",
         "key": "Interval1516418925315",
         "snoozeEnd": "2018-01-19T08:00:00.000Z",
       },
        {
         "allComplete": false,
         "completions":  [],
         "id": "Interval1516494264502",
         "intervalEnd": "2018-01-21T07:59:59.999Z",
         "intervalStart": "2018-01-20T08:00:00.000Z",
         "snoozeEnd": "2018-01-21T00:24:24.504Z",
       },
        {
         "allComplete": false,
         "completions": [
            {
             "completedOn": moment().startOf("day").add(3, 'hours').toDate(),
             "habitName": "Meditate",
             "id": "Completion1517455510799",
             "pointValue": 2,
           },
         ],
         "id": "Interval1517455503024",
         "intervalEnd": moment().endOf("day").toDate(),
         "intervalStart": moment().startOf("day").toDate(),
         "snoozeEnd": "2018-02-01T03:25:03.027Z",
       },
     ],
     "key": "habit1516418925315",
     "name": "Meditate",
     "pointValue": 2,
     "snoozeActive": true,
     "snoozeIncrement": 1,
     "snoozeInterval": "hour",
   }

let allComplete = {
     "bonusFrequency": 2,
     "bonusInterval": "day",
     "description": "",
     "intervals":  [
       {
         "allComplete": false,
         "completions":  [],
         "intervalEnd": "2018-01-20T07:59:59.999Z",
         "intervalStart": "2018-01-19T08:00:00.000Z",
         "key": "Interval1516418925315",
         "snoozeEnd": "2018-01-19T08:00:00.000Z",
       },
        {
         "allComplete": false,
         "completions":  [],
         "id": "Interval1516494264502",
         "intervalEnd": "2018-01-21T07:59:59.999Z",
         "intervalStart": "2018-01-20T08:00:00.000Z",
         "snoozeEnd": "2018-01-21T00:24:24.504Z",
       },
  	{
         "allComplete": true,
         "completions":  [
            {
             "completedOn": moment().startOf("day").add(3, 'hours').toDate(),
             "habitName": "Meditate",
             "id": "Completion1517455510799",
             "pointValue": 2,
           },
            {
             "completedOn": moment().startOf("day").add(5, 'hours').toDate(),
             "habitName": "Meditate",
             "id": "Completion1517455763981",
             "pointValue": 2,
           },
         ],
         "id": "Interval1517455503024",
         "intervalEnd": moment().endOf("day").toDate(),
         "intervalStart": moment().startOf("day").toDate(),
         "snoozeEnd": "2018-02-01T03:25:03.027Z",
       },
     ],
     "key": "habit1516418925315",
     "name": "Meditate",
     "pointValue": 2,
     "snoozeActive": true,
     "snoozeIncrement": 1,
     "snoozeInterval": "hour",
  }

module.exports = {
	noCompletions: noCompletions,
	oneCompletion: oneCompletion,
	allComplete: allComplete
}

//Add real moments dates etc