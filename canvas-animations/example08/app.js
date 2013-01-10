/*global  window,document,setInterval */

(function(){

	var MAX_ACTORS = 5;
	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 30;
	var actors = [];
	var context = null;
	var stage = {};

	var spring = 0.1;
	var friction = 0.8;
	var gravity = 5;

	var targetX = 0;
	var targetY = 0;

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

			actors[0].move(targetX, targetY);
			actors[0].draw();

			// draw each actor
			for (var i=1; i<actors.length; i++) {
				var actorA = actors[i-1];
				var actorB = actors[i];
				actorB.move(actorA.x, actorA.y);
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
		this.r = 10; // radius
		this.vx = 0; // velocity x
		this.vy = 0; // velocity y
	}

	Actor.prototype = {

		move: function(tx, ty) {
			// movement with spring, friction and gravity
			var dx = tx - this.x;
			var dy = ty - this.y;
			var ax = dx * spring;
			var ay = dy * spring;

			this.vx += ax;
			this.vy += ay;

			this.vy += gravity;

			this.vx *= friction;
			this.vy *= friction;

			this.x += this.vx;
			this.y += this.vy;
		},

		draw: function() {
			context.fillStyle = this.c;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		}
	};

	function init() {

		var canvas = document.getElementById('canvas');
		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		// add event handler
		canvas.addEventListener("click", function(e){
			
			targetX = e.clientX - canvas.offsetLeft;
			targetY = e.clientY - canvas.offsetTop;
		
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
	}

	window.onload = init;

}());