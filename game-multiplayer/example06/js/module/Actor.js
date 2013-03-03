define(function () {
	'use strict';

	function Actor() {
		this.uid = null;
		this.c = "#FFFFFF"; // color
		this.x = 0;
		this.y = 0;
		this.r = 20; // radius
		this.vx = 5; // velocity x
		this.vy = 5; // velocity y
		this.targetX = 0;
		this.targetY = 0;
		this.animate = false;
		this.spring = 0.005;
		this.friction = 0.95;
	}

	Actor.prototype = {

		init: function(c, uid) {
			this.uid = uid;
			this.c = c; // color
		},

		calc: function() {
			if(this.animate) {
				// movement with spring and friction
				var dx = this.targetX - this.x;
				var dy = this.targetY - this.y;
				var ax = dx * this.spring;
				var ay = dy * this.spring;

				this.vx += ax;
				this.vy += ay;
				this.vx *= this.friction;
				this.vy *= this.friction;

				this.x += this.vx;
				this.y += this.vy;
			} else {
				this.x = this.targetX;
				this.y = this.targetY;
			}
		},

		draw: function(context) {
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
		},

		setPosition: function(x,y) {
			this.animate = false;
			this.targetX = x;
			this.targetY = y;
		}
	};

	return Actor;

});