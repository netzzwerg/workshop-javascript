/*global  window,document,setInterval */

(function(){

	var MAX_ACTORS = 1;
	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 30;
	var actors = [];
	var context = null;
	var stage = {};

	var targetX = 0;
	var targetY = 0;

	var spring = 0.005;
	var friction = 0.95;

	// STAGE Object
	function Stage() {
		this.c = "#000000"; // color
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
			context.fillStyle = '#000000';
			context.fillRect(0, 0, WIDTH, HEIGHT);
		}

	};


	// ACTOR Object
	function Actor() {
		this.c = "#FFFFFF"; // color
		this.x = WIDTH / 2 * Math.random();
		this.y = HEIGHT / 2 * Math.random();
		this.r = 20; // radius
		this.vx = 5; // velocity x
		this.vy = 5; // velocity y
	}

	Actor.prototype = {

		calc: function() {
			// movement with spring and friction
			var dx = targetX - this.x;
			var dy = targetY - this.y;
			var ax = dx * spring;
			var ay = dy * spring;

			this.vx += ax;
			this.vy += ay;
			this.vx *= friction;
			this.vy *= friction;

			this.x += this.vx;
			this.y += this.vy;
		},

		draw: function() {
			// ball
			context.fillStyle = this.c;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		}
	};

	function init() {

		var canvas = document.getElementById('canvas');
		// your code here

		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		// add event handler
		canvas.addEventListener("click", function(e){
			var targetX = e.clientX - canvas.offsetLeft;
			var targetY = e.clientY - canvas.offsetTop;
			// your code here
		}, false);

		//set target point
		targetX = WIDTH / 2;
		targetY = HEIGHT / 2;

		// create set of actors
		for (var i = 0; i < MAX_ACTORS; i++) {
			actors.push(new Actor());
		}

		// request animation frame
		var onFrame = window.requestAnimationFrame;

		function tick(timestamp) {
			stage.render();
			onFrame(tick);
		}

		onFrame(tick);

		// your code here
	}

	window.onload = init;

}());