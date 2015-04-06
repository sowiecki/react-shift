module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    browserify: {
      options: {
        transform: [ require("grunt-react").browserify ]
      },
      app: {
        src: "react-shift.jsx",
        dest: "react-shift.js"
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
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-react");

  grunt.registerTask("transform",[
    "browserify"
  ]);
};