const Actions = {

	routeRequest: function speechRequest(actionName, data){
		var response = null;
		
		if(actionName && (typeof this[actionName] == "function") && actionName != "routeRequest"){
			//response = this[actionName].apply(Actions, data);
			response = this[actionName](data);
		} else {
			throw "No action with name " + actionName;
		}

		return response;
	},

	sum: function sum(data){
		var result = 0;

		if(data && data.parameters && data.parameters.number &&
			data.parameters.number.length > 0){

			var sum = data.parameters.number.reduce((acc, val) => acc + val);
			if(data.parameters.prev_number){
				console.log('prev_number', data.parameters.prev_number, JSON.stringify(data.parameters.prev_number));
				sum += data.parameters.prev_number.reduce((acc, val) => acc + val);
			}

			result = data.fulfillment.speech;
			result += ' ';
			result += sum;

		} else {
			result = "Tú estás tonto o qué?"
		}

		return result;
	},





};

module.exports = Actions;