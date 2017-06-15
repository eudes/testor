var assert = require('chai').assert;

const actions = require('../actions.js');


describe('actions', function(){
	describe('sum()', function(){
		var tests = [
			{args: [1, 1], expected: 2},
			{args: [], expected: 0},
			{args: [500, 10, 10, 10], expected: 530}
		];

		tests.forEach(function (test) {
			it('correctly adds ' + test.args.length + ' args', function() {
				var res = actions.routeRequest('sum', {
					parameters: {
						number: test.args
					}
				});
				assert.equal(res, test.expected);
			});

		});

	});

});
