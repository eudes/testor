'use_strict';

const ContextHelper = {
	createContextEntry: function createContextEntry(contextName, parameters, lifespan){
		return {
			name: contextName,
			parameters: parameters,
			lifespan: lifespan || 5,
		};
	},

	getContext: function getContext(contextName, contexts){
		var result = null;
		if(contexts && contexts.length > 0 && contextName){
			result = contexts.find( (c) => c.name === contextName );
			console.log("found context " + contextName, result);
		}
		return result;
	},
};

module.exports = ContextHelper;
