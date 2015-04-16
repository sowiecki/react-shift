module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    browserify: {
      options: {
        transform: [ require("grunt-react").browserify ],
        ignore: "react"
      },
      app: {
        src: "example.jsx",
        dest: "example_compiled.js"
      }
    },
    react: {
      combined_file_output: {
        files: {
          "react-shift.js": [
            "react-shift.jsx"
          ]
        }
      },
    },
    watch: {
      files: ["./example.jsx"],
      tasks: ["browserify"],
    },
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-react");

  grunt.event.on("watch", function(action, filepath, target) {
    grunt.log.writeln(target + ": " + filepath + " has " + action);
  });

  grunt.registerTask("transform",[
    "react"
  ]);
};