'use_strict';

const fs = require('fs');

const RequestLogger = {
	logToFile: function appendToFile(logFolder) {
		return function appender(req, res, next) {
			if(req.body && req.body.result && req.body.result.action){
				let filename = req.body.result.action + '_' + (new Date()).getTime() + '.json';
				fs.writeFile(logFolder + '/' + filename, JSON.stringify(req.body, null, 4));
			}

			next();
		}
	},

}

module.exports = RequestLogger;