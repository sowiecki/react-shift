var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var browserify = require('browserify');
var eslint = require('gulp-eslint');

var path = 'src/**/*';
var src = './src/react-shift.jsx';
var dist = './dist';

// Development
gulp.task('dev', function() {
  browserify({
      entries: src,
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('react-shift.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('watch', ['dev'], function(){
	gulp.watch(path, ['dev']);
});

gulp.task('lint', function () {
  return gulp.src(['src/**/*'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// Production
gulp.task('prod', ['lint'], function () {
  browserify({
      entries: src,
    })
    .transform(babelify)
    .bundle()
    .pipe(source('react-shift.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dist));
});

// Demo
gulp.task('compileDemo', function() {
  browserify({
      entries: './demo/demo.jsx',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('demo.js'))
    .pipe(gulp.dest('./demo'));
});

gulp.task('demo', ['compileDemo'], function() {
  gulp.watch(['demo/demo.jsx', path], ['compileDemo']);
})
