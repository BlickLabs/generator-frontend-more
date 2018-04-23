var gulp = require('gulp'),
  paths = require('../gulpconfig').paths,
  imagemin = require('gulp-image'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('copy:images', function () {
  gulp.src(paths.getSrc('img'))
    .pipe(gulpIf(production, imagemin()))
    .pipe(gulp.dest(paths.getCompiled(production, 'img')));

  gulp.src(paths.getSrc('favicon'))
    .pipe(gulp.dest(paths.getCompiled(production, 'root')));
});
