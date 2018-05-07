var src = './src',
  dist = './dist',
  build = './build',
  bower = './bower_components',
  package = 'test_project',
  paths = {
    src: {
      styles_all: src + '/styl/**/*.styl',
      styles_main: src + '/styl/main.styl',
      svg_files: src + '/svg/**/*.svg',
      svg_dir: src + '/svg/',
      scripts_all: src + '/js/**/*.js',
      scripts_main: src + '/js/app.js',
      img: src + '/img/**/*.*',
      favicon: src + '/favicon.ico',
      fonts: src + '/fonts/**/*.*',
      root: src
    },
    compiled: {
      css: '/css/',
      js: '/js/',
      img: '/img/',
      fonts: '/fonts/',
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
  etc: {
    projectName: 'Test project',
    formattedName: package
  }
};