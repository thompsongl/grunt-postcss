var fs = require("fs");

var bemLinter = require('postcss-bem-linter');
var cssnext = require("cssnext");
var eachAsync = require("each-async");
var namespace = require('postcss-class-prefix');
var postcss = require("postcss");

/**
 * Grunt plugin for postcss/cssnext
 *
 * @param  {Object} grunt
 */
module.exports = function(grunt) {
  grunt.registerMultiTask("postcss", "Use tomorrow's CSS syntax, today", function() {
    var options = this.options({
      namespace: {
        prefix: '',
        options: {}
      },
      import: {}
    });

    if(options.bemLinter) {
      options.import.onImport = function(files){
        files.forEach(function (file) {
          var css = fs.readFileSync(file, 'utf-8');
          postcss().use(bemLinter('suit')).process(css);
        });
      };
    }

    eachAsync(this.files, function(el, i, next) {
      options.from = el.src[0];
      options.to = el.dest;

      var input = fs.readFileSync(options.from, "utf8");
      var output = postcss()
          .use(cssnext(options))
          .use(namespace(options.namespace.prefix, options.namespace.options))
          .process(input);
      grunt.file.write(options.to, output);
      next();
    }, this.async());
  });
};
