const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const actions = require('../actions.js');

const sampleRequestsFolder = ('sampleRequests');

describe('actions', function(){
	describe('sum()', function(){
		let tests = findFilesInPath(sampleRequestsFolder, /^sum_.*.json$/)
			.map((filename) => {
				request: fs.readFileSync(filename),
				response: null) // TODO: generar respuestas automáticamente?

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

function findFilesInPath(startPath, filterRE) {

    var result = [];

    if (!fs.existsSync(startPath)) {
        throw "No directory " + startPath;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (filter.test(filename)) {
            result.push(filename);
        };
    };

    return result;
}