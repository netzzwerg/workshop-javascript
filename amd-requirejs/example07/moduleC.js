define(['moduleMediator'], function(mediator) {
	var counter = 0;
	return {
		incrementCounter: function() {
			mediator.publish('valueChange', ++counter);
		}
	};
});