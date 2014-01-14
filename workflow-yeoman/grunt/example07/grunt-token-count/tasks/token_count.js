/*
 * grunt-token-count
 * https://github.com/netzzwerg/workshop-javascript
 *
 * Copyright (c) 2014 Béla Varga
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('token_count', 'Parse JavaScript and count tokens.', function() {
    
    var esprima = require('esprima');

    var histogram = {
        Boolean: 0,
        Identifier: 0,
        Keyword: 0,
        Null: 0,
        Numeric: 0,
        Punctuator: 0,
        RegularExpression: 0,
        String: 0
    };

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {

        grunt.log.writeln('Token count for: ' + filepath);

        // Read file source.
        var content = grunt.file.read(filepath),
            tokens = esprima.parse(content, { tokens: true }).tokens;

        tokens.forEach(function (token) {
            histogram[token.type] += 1;
        });

      });

      for (var type in histogram) {
          if (histogram.hasOwnProperty(type)) {
              grunt.log.writeln(type + ' : ' + histogram[type]);
          }
      }

    });
  });

};