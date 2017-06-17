'use_strict';

const ContextHelper = require('./helpers/contextHelper.js');

const Actions = {
	
	routeRequest: function routeRequest(actionName, req, res){
		
		if(actionName && (typeof this[actionName] == "function") && actionName != "routeRequest"){
			//res = this[actionName].apply(Actions, data);
			res = this[actionName](req, res);
			
		} else {
			throw "No action with name " + actionName;
		}
		
		return res;
	},
	
	sum: function sum(req, res){
		var sum = 0;
		var text = "";
		
		if(req && req.result.parameters && req.result.parameters){
			
			var params = req.result.parameters;
			if(params.number && params.number.length > 0){
				
				sum = params.number.reduce((acc, val) => acc + val);
				
				if(params.prev_number && params.prev_number.length > 0){
					sum += params.prev_number.reduce((acc, val) => acc + val);
				}
				
				text = req.result.fulfillment.speech;
				text += ' ';
				text += sum;
			}
			
		} else {
			text = "Tú estás tonto o qué?"
		}
		
		res.contextOut.push(ContextHelper.createContextEntry("sum", 
			{
				number: sum,
			}
		));
		
		res.displayText = text;
		res.speech = text;
		
		return res;
	},
	
	findPhoto: function findPhotos(req, res) {

		if(req && req.result.parameters && req.result.parameters){
			
			var params = req.result.parameters;
			if(params.query){
				// res.messages = [ {
				// 	type: 1,
				// 	image: 'https://nociones.files.wordpress.com/2010/02/zp.jpg',
				// 	text: 'https://nociones.files.wordpress.com/2010/02/zp.jpg'
				// }];
				
				res.speech = 'https://nociones.files.wordpress.com/2010/02/zp.jpg';
			}
		}

		return res;
	},
	
};

module.exports = Actions;
