if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function () {
	'use strict';

	var Moooped = {

		deg2rad: function (deg) {
			return deg * (Math.PI / 180);
		},

		rad2deg: function (rad) {
			return rad * (180 / Math.PI);
		},

		lineDistance: function(sx, sy, tx, ty) {
			var xs = 0;
			var ys = 0;
			xs = tx - sx;
			xs = xs * xs;
			ys = ty - sy;
			ys = ys * ys;
			return Math.sqrt( xs + ys );
		}

	};

	return Moooped;

});