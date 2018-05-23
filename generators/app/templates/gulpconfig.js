var src = './src',
  dist = './dist',
  build = './build',
  bower = './bower_components',
  package = '<%= filename %>',
  paths = {
    src: {
      styles_all: src + '/styl/**/*.styl',
      styles_main: src + '/styl/main.styl',
      svg_files: src + '/svg/**/*.svg',
      svg_dir: src + '/svg/',
      scripts_all: src + '/js/**/*.js',
      scripts_main: src + '/js/app.js',
      jsons_all: src + '/json/**/*.json',
      img: src + '/img/**/*.*',
      favicon: src + '/favicon.ico',
      fonts: src + '/fonts/**/*.*',<% if (onlyFrontend) { %>
      templates_all: src + '/templates/**/*.njk',
      templates_dir: src + '/templates/',
      templates_partials: src + '/templates/seo/*.njk',
      templates_partials: src + '/templates/partials/*.njk',
      templates_sections: src + '/templates/sections/*.njk',<% } %>
      root: src
    },
    compiled: {
      css: '/css/',
      js: '/js/',
      json: '/json/',
      img: '/img/',
      fonts: '/fonts/',<% if (onlyFrontend) { %>
      html: '/*.html',<% } %>
      all: '/**/*'
    }
  };

module.exports = {
  paths: {
    getSrc: function (files) {
      return paths.src[files];
    },
    getCompiled: function (production, files) {
      var root = production ? 'dist' : 'build';
      if (files === 'root') {
        return root;
      } else {
        return root + paths.compiled[files];
      }
    },
    getBower: function (package) {
      return bower + '/' + package;
    }
  },
  outputs: {
    getLibs: function (extension) {
      return package + '.libs.' + extension;
    },
    getFiles: function (extension) {
      return package + '.' + extension;
    }
  },
  etc: {<% if (onlyFrontend) { %>
    domain: '',<% } %>
    projectName: '<%= projectName %>',
    formattedName: package
  }
};