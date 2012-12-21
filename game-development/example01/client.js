(function(window,$,undefined) {

	var socket = io.connect('http://localhost:1337');
	var _this = this;

	var addClientBox = function(){
		var div = $('<div/>')
			.addClass('client')
			.html('client')
			.click(function() {
				socket.emit('show');
			});
		$('body').append(div);
	};

	var removeClientBox = function(){
		$('.client:first').remove();
	};

	var showClientBox = function(){
		console.log('show');
		$('.client:first').animate({"width": "200px"}).animate({"width": "100px"});
	};

	addClientBox();

	socket.on('add', function(data) {
		addClientBox();
	});

	socket.on('remove', function(data) {
		removeClientBox();
	});

	socket.on('show', function(data) {
		showClientBox();
	});

}(window,jQuery));