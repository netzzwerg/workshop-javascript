/*
 *
 */
var events     = require('events');
var async      = require('async');
var path       = require('path');
var glob       = require('glob');
var fs         = require('fs');

var config     = require('bower/lib/core/config');

module.exports = function(grunt) {
 'use strict';

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('my_grunt_plugin', 'Your task description goes here.', function() {

    var doneCallback = this.async();
    grunt.helper('fec:readConfig');
    grunt.helper('fec:readFolder', doneCallback);

  });

  grunt.registerHelper('fec:readConfig', function() {

    var configFile = grunt.config('my-config').js;
    var fileContent = grunt.file.read('app/'+configFile);
    // don´t need eval if the config is a valid json file and not a javascript file
    var configObject = eval(fileContent);
    // update the rjs path configuration
    grunt.config('rjs').paths = configObject.paths;

  });

  grunt.registerHelper('fec:readFolder', function(cb) {

    glob('./' + config.directory + '/*',function(err,dirs){
        dirs.forEach(function (dir) {
          var name = path.basename(dir);
          // update the rjs path configuration
          grunt.config('rjs').paths[name] = dir;
        });
        cb();
    });

  });

};