var moment = require('moment');

module.exports = {
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

//Add real moments dates etc