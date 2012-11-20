define(['moduleA'], function(moduleA) {
	return {
		incrementCounter: function() {
			return moduleA.incrementCounter();
		}
	};
});