module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha','chai', 'phantomjs-shim'],
    'plugins': [
      'karma-browserify',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-babel-preprocessor',
      'karma-phantomjs-shim',
      'karma-spec-reporter'
    ],
    reporters: ['spec'],
    singleRun: true,
    files: [
      'src/**/*',
      'test/*.js'
    ],
    preprocessors: {
      'src/**/*': ['browserify'],
      'test/**/*': ['browserify']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015', 'react'],
        sourceMap: 'inline'
      }
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    },
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      exitOnResourceError: true
    }
  });
};
