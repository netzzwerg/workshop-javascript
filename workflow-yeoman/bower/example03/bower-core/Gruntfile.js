module.exports = function( grunt ) {

	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		compare_size: {
			files: [ "dist/core.js", "dist/core.min.js" ]
		},
		concat: {
			dist: {
				src: [ "src/app.js", "src/hashParams.js", "src/lazyLoader.js", "src/queue.js", "src/system.js", "src/currpage.js", "src/htmlQueue.js", "src/mediator.js", "src/renderer.js", "src/uniqueId.js" ],
				dest: "dist/core.js"
			}
		},
		uglify: {
			all: {
				files: {
					"dist/core.min.js": [ "dist/core.js" ]
				},
				options: {
				}
			}
		}
	});

	grunt.registerMultiTask('concat', 'Concatenate files.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			separator: grunt.util.linefeed,
			process: false
		});
		// Normalize boolean options that accept options objects.
		if (options.process === true) { options.process = {}; }

		// The source files to be concatenated. The "nonull" option is used
		// to retain invalid files/patterns so they can be warned about.
		var files = grunt.file.expand({nonull: true}, this.file.srcRaw);

		// Concat banner + specified files.
		var src = files.map(function(filepath) {
		// Warn if a source file/pattern was invalid.
		if (!grunt.file.exists(filepath)) {
			grunt.log.error('Source file "' + filepath + '" not found.');
			return '';
		}
		// Read file source.
		var src = grunt.file.read(filepath);
		// Process files as templates if requested.
		if (options.process) {
			src = grunt.template.process(src, options.process);
		}
		return src;
		}).join(grunt.util.normalizelf(options.separator));

		// Write the destination file.
		grunt.file.write(this.file.dest, src);

		// Print a success message.
		grunt.log.writeln('File "' + this.file.dest + '" created.');
	});

	// Load grunt tasks from NPM packages
	grunt.loadNpmTasks("grunt-compare-size");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// Default grunt
	grunt.registerTask( "default", [ "concat", "uglify", "compare_size" ] );

};