define(['require', 'jquery'], function (require, $) {

	var deferred = $.Deferred();

	require(['moduleB'],function(moduleB){
		deferred.resolve(moduleB);
	});

	return deferred.promise();

});