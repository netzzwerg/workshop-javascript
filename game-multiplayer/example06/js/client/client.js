require(['ready','underscore','Stage','Actor'], function (ready, _, Stage, Actor) {

	var WIDTH = 800;
	var HEIGHT = 600;
	var HOST = 'http://localhost:1337';
	var UID = null; // UID of local client

	function onStageClick(data, socket) {
		socket.emit('clientMessage', {
			x: data.x,
			y: data.y,
			uid: UID
		});
	}

	function onConnected(data) {
		UID = data.uid;
		_.each(data.clients, function(client, uid){
			var actor = new Actor();
			var color = '#66D9EF';
			if(uid === UID) { color = '#A6E22E'; }
			actor.init(color, uid);
			actor.setPosition(client.data.x, client.data.y);
			this.addActor(actor);
		}, this);
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
		this.getActor(data.uid).setTarget(data.x, data.y);
	}

	function onDisconnect(data) {
		this.clearActors();
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