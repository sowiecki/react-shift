module.exports = function(grunt) {
  var reactify = require('grunt-react').browserify;

  grunt.initConfig({
    browserify: {
      dev: {
        options: {
          transform: [ reactify ],
          browserifyOptions: {
              extensions: ['.jsx'],
              debug: true
          },
          watch: true,
          keepAlive: true
        },
        files: {
          "example.js": "example.jsx"
        }
      },
      prod: {
        files: {
            "react-shift.js": "react-shift.jsx"
        },
        options: {
          transform: [reactify],
          browserifyOptions: {
            extensions: ['.jsx']
          }
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");

  grunt.event.on("watch", function(action, filepath, target) {
    grunt.log.writeln(target + ": " + filepath + " has " + action);
  });

  grunt.registerTask('default', ['browserify:prod']);
  grunt.registerTask('dev', ['browserify:dev']);
  grunt.registerTask('prod', ['browserify:prod']);
};