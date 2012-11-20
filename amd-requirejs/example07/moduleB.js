define(['moduleMediator'], function(mediator){
	mediator.subscribe('valueChange', function(msg){
		console.log(msg);
	});
});