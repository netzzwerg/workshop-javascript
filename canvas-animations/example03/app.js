/*global  window,document,setInterval */

(function(){

	var MAX_ACTORS = 1;
	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 30;
	var actors = [];
	var context = null;

	// STAGE Object
	function Stage() {

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
		this.x = WIDTH / 2;
		this.y = HEIGHT / 2;
		this.r = 20;
		this.angle = 0;
	}

	Actor.prototype = {

		calc: function() {

		},

		draw: function() {
			context.fillStyle = '#FFFFFF';
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		}
	};

	function init() {

		var canvas = document.getElementById('canvas');
		var stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

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