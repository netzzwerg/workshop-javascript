define(['require'], function (require) {

	if(false){

		require(['moduleB'],function(moduleB){
			console.log('Module B');
			moduleB.incrementCounter();
		});

	} else {

		require(['moduleC'],function(moduleC){
			console.log('Module C');
			moduleC.incrementCounter();
		});

	}

});