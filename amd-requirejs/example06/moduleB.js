define(['moduleCore'], function(core){
	return {
		incrementCounter: function() {
			return ++core.counter;
		}
	};
});