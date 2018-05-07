var gulp = require('gulp'),
  paths = require('../gulpconfig').paths,
  ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src(paths.getCompiled(true, 'all'))
    .pipe(ghPages());
});