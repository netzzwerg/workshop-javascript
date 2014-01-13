module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({});

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};