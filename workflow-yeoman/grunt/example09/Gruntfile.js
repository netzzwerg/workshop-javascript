module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/scripts/lib'
    },


    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',

    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.


    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'images/**'
    },

    // javascript file with require js path config
    'rjs-config': {
      js: 'scripts/config.js'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      
      optimize: 'none', // no minification, is done by the min task
      paths: {}, // will be overwritten by rjs-config file
      appDir: '../app', // can´t change this folder, hard coded in rjs task
      baseUrl: 'scripts/lib',
      wrap: true,
      modules: [
        {
            name: '../hook',
            include: ['vendor/jQuery']
        },
        {
            name: '../tracking',
            include: ['vendor/jQuery']
        }
    ],
      dir: '../temp' // output directory
    },

    // While Yeoman handles concat/min when using
    // usemin blocks, you can still use them manually
    concat: {
      dist: '',
      'temp/built.js' : ['scripts/lib/core/currpage.js', 'scripts/lib/core/mediator.js']
    },

    min: {
      dist: '',
      'temp/built.min.js' : ['temp/built.js']
    },

    uglify: {
      mangle: {toplevel: true},
      squeeze: {dead_code: false},
      codegen: {quote_keys: true}
    }
  });



// get bower dir, look for configs, add to main config

  // Read separate javascript file and use it to set require js path
  grunt.registerTask('rjs-config', 'Using config file as the primary source for rjs information', function() {
    var configFile = grunt.config('rjs-config').js;
    var fileContent = grunt.file.read(configFile);
    // don´t need eval if the config is a valid json file and not a javascript file
    var configObject = eval(fileContent);
    grunt.config('rjs').paths = configObject.paths;
  });

  // We also have to rebuild the build task with the new targetList
  grunt.registerTask('build', 'Build chip frontend controller', function() {
    var tasks = 'clean mkdirs usemin-handler rjs-config rjs concat min css rev usemin manifest copy time';
    grunt.task.run(tasks);
  });

};
