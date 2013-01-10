/*global module:false*/
module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-connect');

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
  },
 connect: {
    uses_defaults: {}
  }


});



// Default task.
grunt.registerTask('default', 'concat min');

};