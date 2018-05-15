var gulp = require('gulp'),
  config = require('../gulpconfig'),
  imagens = require('gulp-image'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('copy:images', function () {
  //var baseDir = production ? config.paths.dist : config.paths.build;
  //// TODO: Modify source to get source from gulpconfig
  gulp.src(['./src/img/**/*.{gif,png,jpg,svg}'])
  .pipe(imagens())
  .pipe(gulp.dest('./build/img'));

  //gulp.src(config.paths.src.favicon)
  // .pipe(gulp.dest(baseDir.root));
});
