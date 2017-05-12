var gulp = require('gulp'),
  paths = require('../gulpconfig').paths,
  portfinder = require('portfinder'),
  connect = require('gulp-connect'),
  argv = require('yargs').argv,
  production = argv.production;

portfinder.basePort = 8080;

gulp.task('server:run', function() {
  portfinder.getPort(function (err, availablePort) {
    connect.server({
      port: availablePort,
      root: paths.getCompiled(production, 'root'),
      livereload: true
    });
  });
});

gulp.task('server:reload', function () {
  var src = [
    config.paths.getSrc('html'),
    config.paths.getSrc('js'),
    config.paths.getSrc('css'),
    config.paths.getSrc('fonts'),
    config.paths.getSrc('img')
  ];
  gulp.src(src)
    .pipe(connect.reload());
});