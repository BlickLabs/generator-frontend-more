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
    'copy:images',
    'build:html'
  ],
  defaultTasks = [
    'build'
  ];

requireDir('./gulptasks');

if (production) {
  buildTasks.push('create:cname');
} else {
  defaultTasks.push('serve', 'watch');
}

gulp.task('build', buildTasks);

gulp.task('watch', function () {
  gulp.watch(paths.getBower(''), ['build:bower', 'server:reload']);
  gulp.watch([paths.getSrc('styles_all'), paths.getSrc('svg_files')], ['build:styles', 'server:reload']);
  gulp.watch(paths.getSrc('scripts_all'), ['build:scripts', 'server:reload']);
  gulp.watch(paths.getSrc('fonts'), ['copy:fonts', 'server:reload']);
  gulp.watch(paths.getSrc('img'), ['copy:images', 'server:reload']);
  gulp.watch(paths.getSrc('templates_all'), ['build:html', 'server:reload']);
});

gulp.task('serve', ['server:run', 'server:reload']);

gulp.task('default', defaultTasks);