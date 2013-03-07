define(['ready','underscore','Stage','Actor'], function (ready, _, Stage, Actor) {

	var WIDTH = 800;
	var HEIGHT = 600;
	var HOST = 'http://localhost:1337';
	var UID = null; // UID of local client

	function onStageClick(data, socket) {
		// emit client target data
	}

	function onConnected(data) {
		// add remote clients to stage
	}

	function onClientConnect(data) {
		// add local client
	}

	function onClientDisconnect(data) {
		// remove client
	}

	function onClientMessage(data) {
		// set target
	}

	function onDisconnect(data) {
		// remove all actors
	}

	function init() {
		var socket = io.connect(HOST);
		var stage = new Stage();
		var onFrame = window.requestAnimationFrame;

		stage.init(WIDTH, HEIGHT, '#272822', 'canvas');
		stage.on('click', onStageClick, socket);

		function tick(timestamp) {
			stage.render();
			onFrame(tick);
		}

		onFrame(tick);

		socket.on('connected', onConnected.bind(stage));
		socket.on('clientConnect', onClientConnect.bind(stage));
		socket.on('clientDisconnect', onClientDisconnect.bind(stage));
		socket.on('clientMessage', onClientMessage.bind(stage));
		socket.on('disconnect', onDisconnect.bind(stage));
	}

	ready(init);

});