var gulp = require('gulp'),
  config = require('../gulpconfig'),
  bowerFiles = require('main-bower-files'),
  cssmin = require('gulp-minify-css'),
  cssconcat = require('gulp-concat-css'),
  jsconcat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('build:bower', function () {
  var fontExtensions = [
      '**/*.eot',
      '**/*.svg',
      '**/*.ttf',
      '**/*.woff',
      '**/*.woff2',
      '**/*.otf'
    ];

  gulp.src(bowerFiles('**/*.css'))
    .pipe(cssconcat(config.outputs.getLibs('css'), {rebaseUrls: false}))
    .pipe(gulpIf(production, cssmin({processImport: false})))
    .pipe(gulp.dest(config.paths.getCompiled(production, 'css')));

  gulp.src(bowerFiles('**/*.js'))
    .pipe(jsconcat(config.outputs.getLibs('js')))
    .pipe(gulpIf(production, uglify()))
    .pipe(gulp.dest(config.paths.getCompiled(production, 'js')));

  gulp.src(bowerFiles(fontExtensions))
    .pipe(gulp.dest(config.paths.getCompiled(production, 'fonts')));
});