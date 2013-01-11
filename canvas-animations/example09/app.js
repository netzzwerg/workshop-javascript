/*global  window,document,setInterval */

(function(){

	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 60;
	var actors = [];
	var context = null;
	var stage = {};

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

		},

		clear: function() {
			context.fillStyle = '#000000';
			context.fillRect(0, 0, WIDTH, HEIGHT);
		}

	};

	// Sprite Object

	// ACTOR Object
	function Actor() {

	}

	Actor.prototype = {

		calc: function() {
			// screen wrapping
		},

		draw: function(s) {

		}
	};


	function loadImage(file, callback) {

	}

	function init() {

		var canvas = document.getElementById('canvas');
		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		canvas.addEventListener("imageLoadReady", function(e){

		}, false);

		sprites.push(new Sprite('character',0, 0, 87, 150));
		sprites.push(new Sprite('character',0, 151, 87, 150));
		sprites.push(new Sprite('character',0, 302, 87, 150));
		sprites.push(new Sprite('character',88, 0, 87, 150));
		sprites.push(new Sprite('character',176, 0, 87, 150));
		sprites.push(new Sprite('character',264, 0, 87, 150));
		sprites.push(new Sprite('character',352, 0, 87, 150));
		sprites.push(new Sprite('character',88, 151, 87, 150));
		sprites.push(new Sprite('character',88, 302, 87, 150));
		sprites.push(new Sprite('character',176, 151, 87, 150));
		sprites.push(new Sprite('character',176, 302, 87, 150));
		sprites.push(new Sprite('character',264, 151, 87, 150));

		var actor = new Actor();
		actors.push(actor);

		loadImage('character');

	}

	window.onload = init;

}());