/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      src: {
        options: {
          curly: false,
          undef: true
        },
        files: {
          src: ['../app/src/app.js', '../app/src/lib.js']
        }
      }
    },

    concat: {
      build: {
        options: {
          separator: ';',
        },
        src: ['../app/src/jquery.js' ,'../app/src/app.js', '../app/src/lib.js'],
        dest: '../app/build/app.js'
      }
    },

    uglify: {
      build: {
        files: { '../app/build/app.min.js': [ '../app/build/app.js' ] }
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '../app',
          keepalive: true,
          open: true
        }
      }
    }

  });

  // Load task modules.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', 'jshint');
  grunt.registerTask('server', 'connect');

};