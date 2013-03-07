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
			// your code here
		},

		clear: function() {
			// your code here
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
			// your code here
		},

		draw: function() {
			// your code here
		}
	};

	function init() {

		var canvas = document.getElementById('canvas');

		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		// add event handler

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