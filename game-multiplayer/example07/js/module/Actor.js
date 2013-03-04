if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['Helper'],function (π ,require) {
	'use strict';

	function Actor() {
		this.uid = null;
		this.color = "#A6E22E";
		this.radius = 20;
		this.animate = false;

		this.x = 40;
		this.y = 40;
		this.angle = 0;
		this.speed = 0;
		this.maxSpeed = 5;
		this.acceleration = 0;
		this.maxAcceleration = 0.05;

		this.targetX = 0;
		this.targetY = 0;
		this.targetAngle = 0;
	}

	Actor.prototype = {

		init: function(c, uid) {
			this.uid = uid;
			this.color = c; // color
		},

		calc: function() {
			if(this.animate) {

				// target reached shut down
				var distance = π.lineDistance(this.x, this.y, this.targetX, this.targetY);

				if(distance < 3) {
					this.acceleration = 0;
					this.speed = 0;
					// position correction
					this.x = Math.round(this.targetX);
					this.y = Math.round(this.targetY);
					return;
				}

				this.angle = this.targetAngle;

				if(this.acceleration > 0 && this.acceleration < this.maxAcceleration) {
					this.acceleration += 0.001;
				}

				// acceleration
				var scale_x = Math.cos(π.deg2rad(this.angle));
				var scale_y = Math.sin(π.deg2rad(this.angle));

				// add acceleration to speed
				if(this.speed > this.maxSpeed) {
					this.speed = this.maxSpeed;
					this.acceleration = 0;
				}

				this.speed += this.acceleration;

				// x and y velocity
				this.vx = this.speed *  scale_x;
				this.vy = this.speed *  scale_y;

				this.x += this.vx;
				this.y += this.vy;


			}
		},

		draw: function(context) {
			this.drawActor(context);
			this.drawMeter(context);
			this.drawTarget(context);
			//this.drawDebug(context);
		},

		drawActor: function(context) {
			context.save();

			// set context to the absolute position
			context.translate(this.x, this.y);

			// ball
			context.fillStyle = this.color;
			context.beginPath();
			context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
			context.fill();

			// orientation marker
			context.rotate(π.deg2rad(this.angle - 45));
			context.beginPath();
			context.fillStyle = 'rgba(0, 0, 0,0.4)';
			context.arc(0, 0, this.radius + 1, 0, Math.PI * 0.5, false);
			context.lineTo(0, 0);
			context.fill();

			context.restore();
		},

		drawMeter: function(context) {
			var speedFactor = Math.round(100 / (this.maxSpeed / this.speed));
			var accFactor = Math.round(100 / (this.maxAcceleration / this.acceleration));
			var speedAngle = 350 - ((350 - 270) / 100) * speedFactor; // top right bar 350 - 270
			var accAngle = 10 + ((90 - 10) / 100) * accFactor; // bottom right bar 10 - 90

			context.save();

			// set context to the absolute position
			context.translate(this.x, this.y);
			context.rotate(π.deg2rad(this.angle));

			context.lineCap = 'round';

			context.beginPath();
			context.globalAlpha = 1;
			context.lineWidth = 5;
			context.strokeStyle = '#a4d033';
			context.arc(0, 0, this.radius + 10, π.deg2rad(350), π.deg2rad(speedAngle), true);
			context.stroke();

			context.beginPath();
			context.globalAlpha = 1;
			context.lineWidth = 5;
			context.strokeStyle = '#ff9600';
			context.arc(0, 0, this.radius + 10, π.deg2rad(10), π.deg2rad(accAngle), false);
			context.stroke();

			context.restore();
		},

		drawDebug: function(context) {
			var text = Math.round(this.angle) + " " +
				Math.round(this.speed) + " " +
				this.acceleration.toFixed(2) + " " +
				this.x.toFixed(2) + " " +
				this.y.toFixed(2);

			context.fillStyle = '#FFFFFF';
			context.font = "12px Press Start 2P";
			context.textBaseline = 'hanging';
			var width = context.measureText(text).width;
			context.fillText(text, Math.round(this.x - width/2), this.y + 35);
		},

		drawTarget: function(context) {
			context.fillStyle = '#FFFFFF';
			context.beginPath();
			context.rect(this.targetX-1, this.targetY-1, 1, 1);
			context.fill();
		},

		setTarget: function(x, y) {
			this.animate = true;
			this.targetX = x;
			this.targetY = y;
			this.targetAngle = π.rad2deg(Math.atan2(this.targetY - this.y, this.targetX - this.x));
			this.acceleration = 0.01;
			this.speed = 0;
		},

		setPosition: function(x, y, angle) {
			this.animate = false;
			this.angle = angle;
			this.x = x;
			this.y = y;
		}
	};

	return Actor;

});