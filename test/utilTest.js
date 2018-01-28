var assert = require('assert');
var habitMock = require('./habitMock');
describe('Mock', function() {
    it('should have the correct info', function() {
      assert.equal(habitMock.name, "Meditate");
    });
});