const Actions = {

	routeRequest: function request(actionName, request, response){
		var response = null;
		
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

		if(request && request.result.parameters && request.result.parameters.number &&
			request.result.parameters.number.length > 0){

			sum = request.result.parameters.number.reduce((acc, val) => acc + val);

			if(request.result.parameters.prev_number && request.result.parameters.prev_number.length > 0){
				console.log('prev_number', request.result.parameters.prev_number, JSON.stringify(request.result.parameters.prev_number));
				sum += request.result.parameters.prev_number.reduce((acc, val) => acc + val);
			}

			text = request.result.fulfillment.speech;
			text += ' ';
			text += sum;

		} else {
			text = "Tú estás tonto o qué?"
		}

		console.log(response);
		response.displayText = text;
		response.speech = text;
		response.contextOut.prev_number = sum;

		return response;
	},

};

module.exports = Actions;