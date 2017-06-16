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
			result += fulfillment.speech;
            result += ' ';
			result += data.parameters.number.reduce((acc, val) => acc + val);
		} else {
			result = "Tú estás tonto o qué?"
		}

		return result;
	},





};

module.exports = Actions;