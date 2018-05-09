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
    'copy:images'<% if (onlyFrontend) { %>,
    'build:html',<% } %>
    'copy:nginx'
  ],
  defaultTasks = [
    'build'
  ];

requireDir('./gulptasks');

<% if (onlyFrontend) { %>if (production) {
  buildTasks.push('create:cname');
} else {
  defaultTasks.push('serve', 'watch');
}<% } else { %>if (!production) {
  defaultTasks.push('watch');
}<% } %>

gulp.task('build', buildTasks);

gulp.task('watch', function () {
  gulp.watch(paths.getBower(''), ['build:bower'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch([paths.getSrc('styles_all'), paths.getSrc('svg_files')], ['build:styles'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch(paths.getSrc('scripts_all'), ['build:scripts'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch(paths.getSrc('fonts'), ['copy:fonts'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch(paths.getSrc('img'), ['copy:images'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);<% if (onlyFrontend) { %>
  gulp.watch(paths.getSrc('templates_all'), ['build:html', 'server:reload']);<% } %>
});

<% if (onlyFrontend) { %>gulp.task('serve', ['server:run', 'server:reload']);<% } %>

gulp.task('default', defaultTasks);