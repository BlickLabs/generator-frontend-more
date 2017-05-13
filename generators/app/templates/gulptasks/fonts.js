var gulp = require('gulp'),
  paths = require('../gulpconfig').paths,
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('copy:fonts', function () {
  return gulp.src(paths.getSrc('fonts'))
    .pipe(gulp.dest(paths.getCompiled(production, 'fonts')));
});