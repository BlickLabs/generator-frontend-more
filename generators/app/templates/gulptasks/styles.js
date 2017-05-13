var gulp = require('gulp'),
  paths = require('../gulpconfig').paths,
  stylus = require('gulp-stylus'),
  stylusIconFont = require('stylus-iconfont'),
  autoprefixer = require('autoprefixer-stylus'),
  import_tree = require('stylus-import-tree'),
  cssmin = require('gulp-minify-css'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('build:styles', function () {
  var fontFactory = new stylusIconFont({
    glyphsDir: paths.getSrc('svg_dir'),
    outputDir: paths.getCompiled(production, 'fonts'),
    fontFacePath: '../fonts/',
    watchMode: false
  });

  return gulp.src(paths.getSrc('styles_main'))
    .pipe(stylus({
      use: [fontFactory.register, autoprefixer('last 2 versions')],
      define: {
        import_tree: import_tree
      }
    }))
    .pipe(gulpIf(production, cssmin({processImport: false})))
    .pipe(gulp.dest(paths.getCompiled(production, 'css')))
    .on('end', function () {
      fontFactory.run();
    });
});