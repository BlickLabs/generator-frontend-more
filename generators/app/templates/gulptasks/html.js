var gulp = require('gulp'),
  config = require('../gulpconfig'),
  nunjucksRender = require('gulp-nunjucks-render'),
  data = require('gulp-data'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('build:html', function () {
  return gulp.src(config.paths.getSrc('templates_sections'))
    .pipe(data(function (file) {
      var sectionName = file.relative.split('.njk')[0];
      return {
        section: sectionName
      };
    }))

    .pipe(data(function() {
      return require('../src/json/data.json')
    }))

    .pipe(nunjucksRender({
      path: config.paths.getSrc('templates_dir'),
      ext: '.html',
      inheritExtension: false,
      manageEnv: function (environment) {
        environment.addGlobal('projectName', config.etc.projectName);
        environment.addGlobal('projectFilesName', config.etc.formattedName);
      }
    }))
    .pipe(gulp.dest(config.paths.getCompiled(production, 'root')));
});
