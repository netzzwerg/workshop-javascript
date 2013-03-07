define(['ready','underscore','Stage','Actor','Input'], function (ready, _, Stage, Actor, input) {

	var WIDTH = 800;
	var HEIGHT = 600;
	var HOST = 'http://192.168.1.107:1337';
	var UID = null; // UID of local client

	function onStageClick(data, socket) {
		var stage = this;

		socket.emit('clientMessage', {
			x: data.x,
			y: data.y,
			angle: stage.getActor(UID).getAngleToTarget(data.x, data.y),
			uid: UID
		});
	}

	function onConnected(data) {
		UID = data.uid;

		// create other actors
		_.each(data.clients, function(client, uid){
			var actor = new Actor();
			actor.init('#66D9EF', uid);
			actor.setPosition(client.data.x, client.data.y, client.data.angle);
			this.addActor(actor);
		}, this);

		// create local actor
		var actor = new Actor();
			actor.init('#A6E22E', UID, input.state);
			actor.local = true;
			this.addActor(actor);
	}

	function onClientConnect(data) {
		var actor = new Actor();
		actor.init('#66D9EF', data.uid);
		this.addActor(actor);
	}

	function onClientDisconnect(data) {
		this.removeActor(data.uid);
	}

	function onClientMessage(data) {
		this.getActor(data.uid).setTarget(data.x, data.y, data.angle);
	}

	function onDisconnect(data) {
		this.clearActors();
	}

	function onUpdate(data) {
		_.each(data, function(client){
			this.getActor(client.uid).handleServerState(client);
		}, this);
	}

	function init() {
		var socket = io.connect(HOST);
		var stage = new Stage();
		var onFrame = window.requestAnimationFrame;

		stage.init(WIDTH, HEIGHT, '#272822', 'canvas');
		stage.on('click', onStageClick.bind(stage), socket);
		input.init();

		// your code here

		socket.on('connected', onConnected.bind(stage));
		socket.on('clientConnect', onClientConnect.bind(stage));
		socket.on('clientDisconnect', onClientDisconnect.bind(stage));
		socket.on('clientMessage', onClientMessage.bind(stage));
		socket.on('disconnect', onDisconnect.bind(stage));
		socket.on('update', onUpdate.bind(stage));
	}

	ready(init);

});