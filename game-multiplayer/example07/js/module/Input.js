if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function () {
	'use strict';

	var Input = {

		state: {
			'left': false,
			'right': false,
			'up': false,
			'down': false
		},

		init: function() {
			window.addEventListener('keydown', this.keydown.bind(this), false );
			window.addEventListener('keyup', this.keyup.bind(this), false );
		},

		keydown: function(event) {
			switch (event.keyCode) {
				case 37:
					// left
					this.state.left = true;
					this.prevent();
					break;
				case 38:
					// up
					this.state.up = true;
					this.prevent();
					break;
				case 39:
					// right
					this.state.right = true;
					this.prevent();
					break;
				case 40:
					// down
					this.state.down = true;
					this.prevent();
					break;
			}
		},

		prevent: function(event) {
			event.preventDefault();
			event.stopPropagation();
		},

		keyup: function() {
		}

	};

	return Input;

});