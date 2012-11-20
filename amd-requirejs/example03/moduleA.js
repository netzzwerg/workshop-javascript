//<?php sleep(5); ?>
define( function(){
	var counter = 0;
	return {
		incrementCounter: function() {
			return ++counter;
		},
		resetCounter: function() {
			counter = 0;
			return counter;
		}
	};
});