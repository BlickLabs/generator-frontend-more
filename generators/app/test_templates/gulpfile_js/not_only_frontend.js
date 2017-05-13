var gulp = require('gulp'),
  paths = require('./gulpconfig').paths,
  requireDir = require('require-dir'),
  argv = require('yargs').argv,
  production = argv.production,
  buildTasks = [
    'build:bower',
    'build:styles',
    'build:scripts',
    'copy:fonts',
    'copy:images'
  ],
  defaultTasks = [
    'build'
  ];

requireDir('./gulptasks');

if (!production) {
  defaultTasks.push('watch');
}

gulp.task('build', buildTasks);

gulp.task('watch', function () {
  gulp.watch(paths.getBower(''), ['build:bower']);
  gulp.watch([paths.getSrc('styles_all'), paths.getSrc('svg_files')], ['build:styles']);
  gulp.watch(paths.getSrc('scripts_all'), ['build:scripts']);
  gulp.watch(paths.getSrc('fonts'), ['copy:fonts']);
  gulp.watch(paths.getSrc('img'), ['copy:images']);
});



gulp.task('default', defaultTasks);