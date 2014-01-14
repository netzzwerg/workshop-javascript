/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    path: '../app/test-jasmine', // change path to jasmine test folder

    watch: {
      scripts: {
        files: '<%= path %>/src/**/*.js',
        tasks: ['jasmine']
      },
    },

    jasmine: {
      pivotal: {
        src: '<%= path %>/src/**/*.js',
        options: {
          specs: '<%= path %>/spec/*Spec.js',
          helpers: '<%= path %>/spec/*Helper.js',
          template : require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage.json',
            report: 'reports/coverage'
          }
        }
      }
    }

  });

  // Load task modules.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks.
  grunt.registerTask('default', 'watch');
  grunt.registerTask('test', 'jasmine');

};