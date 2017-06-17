'use_strict';

const ContextHelper = require('./helpers/contextHelper.js');
const SlackMessagesHelper = require('./helpers/slackMessagesHelper.js');

const Actions = {
	
	/**
	 * Routes the request to the appropiate action method
	 */
	routeRequest: function routeRequest(actionName, req, res){
		
		if(actionName && (typeof this[actionName] == "function") && actionName != "routeRequest"){
			//res = this[actionName].apply(Actions, data);
			res = this[actionName](req, res);
			
		} else {
			throw "No action with name " + actionName;
		}
		
		return res;
	},
	
	/**
	 * Sums a list of numbers
	 */
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
	
	/**
	 * Finds a photo
	 */
	findPhoto: function findPhotos(req, res) {

		if(req && req.result.parameters && req.result.parameters){
			
			var params = req.result.parameters;
			if(params.query){
				var photo = 'https://nociones.files.wordpress.com/2010/02/zp.jpg';

				res.data = {
					slack: SlackMessagesHelper.image(params.query, photo)
				};
				res.speech = photo;

			} else {
				res.speech = 'No query';
			}
		}

		return res;
	},
	
};

module.exports = Actions;
