'use_strict';

const ContextHelper = require('./helpers/contextHelper.js');

const Actions = {

	routeRequest: function request(actionName, request, response){

		if(actionName && (typeof this[actionName] == "function") && actionName != "routeRequest"){
			//response = this[actionName].apply(Actions, data);
			response = this[actionName](request, response);
			
		} else {
			throw "No action with name " + actionName;
		}

		return response;
	},

	sum: function sum(request, response){
		var sum = 0;
		var text = "";

		if(request && request.result.parameters && request.result.parameters){
			
			var params = request.result.parameters;
			if(params.number && params.number.length > 0){

				sum = params.number.reduce((acc, val) => acc + val);

				if(params.prev_number && params.prev_number.length > 0){
					sum += params.prev_number.reduce((acc, val) => acc + val);
				}

				text = request.result.fulfillment.speech;
				text += ' ';
				text += sum;
			}

		} else {
			text = "Tú estás tonto o qué?"
		}

		var context = [];
		context.push(ContextHelper.createContextEntry("sum", 
			{
				number: sum,
			}
		));

		response.displayText = text;
		response.speech = text;
		response.contextOut = context;

		return response;
	},

};

module.exports = Actions;