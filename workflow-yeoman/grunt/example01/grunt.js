/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		concat: {
			dist: {
				src: ['app/src/jquery.js' ,'app/src/app.js', 'app/src/lib.js'],
				dest: 'app/build/app.js'
			}
		},

		min: {
			dist: {
				src: 'app/build/app.js',
				dest: 'app/build/app.min.js'
			}
		}

	});

	// Default task.
	grunt.registerTask('default', 'concat min');

};