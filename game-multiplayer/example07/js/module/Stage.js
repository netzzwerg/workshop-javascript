if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function () {
	'use strict';

	function Stage() {
		this.c = "#FFFFFF"; // color
		this.l = 0; // left
		this.r = 0; // right
		this.t = 0; // top
		this.b = 0; // bottom
		this.actors = [];
		this.doRender = false;
	}

	Stage.prototype = {

		init: function(w, h, c, canvasName) {
			this.c = c; // color
			this.r = w; // right
			this.b = h; // bottom
			if (canvasName) {
				this.canvas = document.getElementById(canvasName);
				this.context = canvas.getContext('2d');
				this.canvas.width = w;
				this.canvas.height = h;
			}
		},

		calc: function() {
			var actors = this.actors;
			for (var i = 0; i < actors.length; i++) {
				actors[i].screenWrapping(this);
				actors[i].calc();
			}
		},

		render: function() {
			if (!this.doRender) { return; }
			this.clear();
			var actors = this.actors;
			for (var i = 0; i < actors.length; i++) {
				actors[i].draw(this.context);
			}
		},

		clear: function() {
			this.context.fillStyle = this.c;
			this.context.fillRect(0, 0, this.r, this.b);
		},

		on: function(eventName, callback, context) {
			switch (eventName) {
				case 'click':
					this.canvas.addEventListener("click", function(e){
						var targetX = e.clientX - canvas.offsetLeft;
						var targetY = e.clientY - canvas.offsetTop;
						callback({x:targetX, y:targetY}, context);
					}, false);
					break;
				default:
					return;
			}
		},

		addActor: function(actor) {
			console.log('add');
			this.actors.push(actor);
			this.doRender = true;
		},

		removeActor: function(uid) {
			for (var i = 0; i < this.actors.length; i++) {
				if (this.actors[i].uid === uid) {
					this.actors.splice(i, 1);
					return true;
				}
			}
			return false;
		},

		getActor: function(uid) {
			for (var i = 0; i < this.actors.length; i++) {
				if (this.actors[i].uid === uid) {
					return this.actors[i];
				}
			}
			return false;
		},

		clearActors: function() {
			this.actors = [];
			this.doRender = false;
		}

	};

	return Stage;

});