requirejs.config({
	baseUrl: 'js/module',
	paths: {
		'ready' : '../vendor/domReady',
		'underscore' : '../vendor/underscore'
	},
	shim: {
		underscore: {
			exports: '_'
		}
	}
});