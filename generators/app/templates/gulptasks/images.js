var gulp = require('gulp'),
  config = require('../gulpconfig'),
  image = require('gulp-image'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('copy:images', function () {
  var baseDir = production ? config.paths.dist : config.paths.build;

  gulp.src(config.paths.src.img)
    .pipe(gulpIf(production, image()))
    .pipe(gulp.dest(baseDir.img));

  gulp.src(config.paths.src.favicon)
    .pipe(gulp.dest(baseDir.root));
});
