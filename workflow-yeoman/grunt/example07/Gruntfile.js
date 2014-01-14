/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    token_count: {
      files: 'backbone.js'
    }
  });

  grunt.loadNpmTasks('grunt-token-count');

  grunt.registerTask('default', 'token_count');

};