const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

const path = 'src/**/*';

const babelPresets = { presets: ['es2015', 'react'] };

// Development
gulp.task('dev', () => {
  return gulp.src(path)
    .pipe(sourcemaps.init())
    .pipe(babel(babelPresets))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['dev'], () => {
  gulp.watch(path, ['dev']);
});

gulp.task('lint', () => {
  return gulp.src([path])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// Production
gulp.task('prod', ['lint', 'dev']);

// Demo
gulp.task('compileDemo', () => {
  browserify({
      entries: './demo/demo.jsx',
      debug: true
    })
    .on('error', (err) => {
      console.log(err.toString());
      this.emit('end');
    })
    .transform(babelify, babelPresets)
    .bundle()
    .pipe(source('demo.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./demo'));
});

gulp.task('demo', ['compileDemo'], () => {
  gulp.watch([path, 'demo/demo.jsx'], ['compileDemo']);
});
