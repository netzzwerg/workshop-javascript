
var path = require('path'),
    util = require('util'),
    yeoman = require('/usr/local/lib/node_modules/yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
  //this.sourceRoot(path.join(__dirname, '../templates'));
  this.appname = path.basename(process.cwd());
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.createAppFile = function createAppFile() {
  this.template('config.js', 'app/scripts/config.js');
  this.template('hook.js', 'app/scripts/hook.js');
  this.template('index.html', 'app/index.html');
};