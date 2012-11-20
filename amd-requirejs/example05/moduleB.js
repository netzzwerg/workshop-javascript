define(function() {
	var counter = 0;
	return {
		incrementCounter: function() {
			console.log(++counter);
		}
	};
});