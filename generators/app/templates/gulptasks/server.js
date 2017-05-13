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
    paths.getCompiled(production, 'html'),
    paths.getCompiled(production, 'js'),
    paths.getCompiled(production, 'css'),
    paths.getCompiled(production, 'fonts'),
    paths.getCompiled(production, 'img')
  ];
  gulp.src(src)
    .pipe(connect.reload());
});