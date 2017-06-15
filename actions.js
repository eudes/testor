const Actions = {

	routeRequest: function speechRequest(actionName, data){
		var response = {
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        };
		
		if(actionName && (typeof this[actionName] == "function") && actionName != "routeRequest"){
			//response = this[actionName].apply(Actions, data);
			var result = this[actionName](data);

			result
		} else {
			throw "No action with name " + actionName;
		}

		return response;
	},

	sum: function sum(data){
		var result = 0;

		if(data && data.parameters && data.parameters.number &&
			data.parameters.number.length > 0){
			result = data.parameters.number.reduce((acc, val) => acc + val);
		}

		return result;
	}



};

module.exports = Actions;