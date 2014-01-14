/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    task: {
      targetFoo: [1, 2, 3],
      targetBar: true
    }

  });

  // Register Multi Task
  grunt.registerMultiTask('task', 'Log stuff.', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
  });

  grunt.registerTask('taskAsync', 'Async task.', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();
    // Run some sync stuff.
    grunt.log.writeln('Processing task...');
    // And some async stuff.
    setTimeout(function() {
      grunt.log.writeln('All done!');
      done();
    }, 1000);
  });

  // Register tasks.
  grunt.registerTask('default', 'task');
  grunt.registerTask('run', ['taskAsync', 'task:targetBar', 'taskAsync', 'task:targetFoo']);

};