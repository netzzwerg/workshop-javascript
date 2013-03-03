/*global  window,document,setInterval */

(function(){

	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 30;
	var actors = [];
	var context = null;
	var stage = {};
	var localUID = 0;

	var spring = 0.005;
	var friction = 0.95;

	// STAGE Object
	function Stage() {
		this.c = "#272822"; // color
		this.l = 0; // left
		this.r = WIDTH; // right
		this.t = 0; // top
		this.b = HEIGHT; // bottom
	}

	Stage.prototype = {

		render: function() {
			this.clear();

			// draw each actor
			for (var i = 0; i < actors.length; i++) {
				actors[i].calc();
				actors[i].draw();
			}
		},

		clear: function() {
			context.fillStyle = this.c;
			context.fillRect(0, 0, WIDTH, HEIGHT);
		}

	};


	// ACTOR Object
	function Actor(uid) {
		this.uid = uid;
		this.c = "#66D9EF"; // color
		this.x = 0;
		this.y = 0;
		this.r = 20; // radius
		this.vx = 5; // velocity x
		this.vy = 5; // velocity y
		this.targetX = 0;
		this.targetY = 0;
		this.animate = false;
	}

	Actor.prototype = {

		calc: function() {
			if(this.animate) {
				// movement with spring and friction
				var dx = this.targetX - this.x;
				var dy = this.targetY - this.y;
				var ax = dx * spring;
				var ay = dy * spring;

				this.vx += ax;
				this.vy += ay;
				this.vx *= friction;
				this.vy *= friction;

				this.x += this.vx;
				this.y += this.vy;
			} else {
				this.x = this.targetX;
				this.y = this.targetY;
			}
		},

		draw: function() {
			// ball
			context.fillStyle = this.c;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		},

		setTarget: function(x,y) {
			this.animate = true;
			this.targetX = x;
			this.targetY = y;
		}
	};

	function init() {

		var canvas = document.getElementById('canvas');
		var socket = io.connect('http://localhost:1337');

		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		// add event handler
		canvas.addEventListener("click", function(e){
			var targetX = e.clientX - canvas.offsetLeft;
			var targetY = e.clientY - canvas.offsetTop;
			socket.emit('clientMessage', {
				x: targetX,
				y: targetY,
				uid: localUID
			});
		}, false);

		//set target point
		targetX = WIDTH / 2;
		targetY = HEIGHT / 2;

		// request animation frame
		var onFrame = window.requestAnimationFrame;

		function tick(timestamp) {
			stage.render();
			onFrame(tick);
		}

		onFrame(tick);

		socket.on('connected', function (data) {
			localUID = data.uid;
			for (var prop in data.clients) {
				if( data.clients.hasOwnProperty(prop) ) {
					var client = data.clients[prop];
					var actor = new Actor(client.data.uid);
					if(client.data.uid === localUID) {
						actor.c = '#A6E22E';
					}
					actor.targetX = client.data.x;
					actor.targetY = client.data.y;
					actors.push(actor);
				}
			}
		});

		socket.on('clientConnect', function (data) {
			var actor = new Actor(data.uid);
			actors.push(actor);
		});

		socket.on('clientDisconnect', function (data) {
			for (var i = 0; i < actors.length; i++) {
				if(actors[i].uid === data.uid) {
					actors.splice(i, 1);
				}
			}
		});

		socket.on('clientMessage', function (data) {
			for (var i = 0; i < actors.length; i++) {
				if(actors[i].uid === data.uid) {
					actors[i].setTarget(data.x, data.y);
				}
			}
		});

		socket.on('connect', function () {
			console.log('server');
		});

		socket.on('disconnect', function (data) {
			actors = [];
		});

	}

	window.onload = init;

}());