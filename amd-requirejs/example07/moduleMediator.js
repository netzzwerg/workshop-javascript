define(function(){

	var channels = {};
	var mediator = {
		subscribe : function(channel, fn){
			if(!channels[channel]) channels[channel] = [];
			channels[channel].push({ callback : fn });
		},
		publish : function(channel){
			if(!channels[channel]) return false;
			for(var i = 0, l = channels[channel].length; i < l; i++){
				var subscription = channels[channel][i];
				subscription.callback(arguments[1]);
			}
		}
	};

	return mediator;

});