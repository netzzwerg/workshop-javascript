/*global  window,document,setInterval */

var MAX_ACTORS = 1; /* anti pattern - global */
var WIDTH = 800;
var HEIGHT = 600;
var FPS = 30;
var actors = [];
var context = null;

function Stage() {
	var _stage = this;

	this.render = function() {
		_stage.clear();

		// draw each actor
		for (var actor in actors) { /* anti pattern - for in loop over array */
			actors[actor].calc();
			actors[actor].draw();
		}
	};

	this.clear = function() {
		context.fillStyle = '#000000';
		context.fillRect(0, 0, WIDTH, HEIGHT);
	};

}

function Actor() {
	this.x = WIDTH / 2;
	this.y = HEIGHT / 2;
	this.r = 20;

	this.calc = function() {
		// sample code goes here
	};

	this.draw = function() {
		context.fillStyle = '#FFFFFF';
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
		context.fill();
	};
}

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

	setInterval(stage.render, 1000 / FPS);
}

window.onload = init;