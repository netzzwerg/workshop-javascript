/*global  window,document,setInterval */

(function(){

	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 10;
	var actors = [];
	var context = null;
	var stage = {};

	var images = [];
	var sprites = [];

	// STAGE Object
	function Stage() {
		this.c = "#000000"; // color
		this.l = 0; // left
		this.r = WIDTH; // right
		this.t = 0; // top
		this.b = HEIGHT; // bottom
		this.i = 0;
	}

	Stage.prototype = {

		render: function() {
			this.i++;
			if(this.i === sprites.length) this.i = 0;
			var s = sprites[this.i];

			this.clear();

			actors[0].calc();
			actors[0].draw(s);
		},

		clear: function() {
			context.fillStyle = '#000000';
			context.fillRect(0, 0, WIDTH, HEIGHT);
		}

	};

	// Sprite Object
	function Sprite(n,x,y,h,w) {
		this.n = n;
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
	}

	// ACTOR Object
	function Actor() {
		this.y = 10;
		this.r = 87;
		this.vy = 10; // velocity y
	}

	Actor.prototype = {

		calc: function() {
			// screen wrapping
			this.y = this.y + this.vy;

			if (this.y - this.r > stage.b) {
				this.y = stage.t - this.r;
			} else if (this.y + this.r < stage.t) {
				this.y = stage.b + this.r;
			}
		},

		draw: function(s) {
			context.drawImage(images[s.n], s.x, s.y, s.h, s.w, this.y, 100, 85, 150);
		}
	};


	function loadImage(file, callback) {
		images[file] = new Image();
		images[file].onload = function() {
			var myEvent = document.createEvent("HTMLEvents");
			myEvent.initEvent("imageLoadReady", true, true);
			canvas.dispatchEvent(myEvent);
		};
		images[file].src = file + ".png";
	}

	function init() {

		var canvas = document.getElementById('canvas');
		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		canvas.addEventListener("imageLoadReady", function(e){
			function tick(){
				stage.render();
			}
			setInterval(tick, 1000 / FPS);
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