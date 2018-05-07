var gulp = require('gulp'),
  config = require('../gulpconfig'),
  jsconcat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('build:scripts', function () {
  return gulp.src(config.paths.getSrc('scripts_all'))
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jsconcat(config.outputs.getFiles('js')))
    .pipe(gulpIf(production, uglify()))
    .pipe(gulp.dest(config.paths.getCompiled(production, 'js')));
});