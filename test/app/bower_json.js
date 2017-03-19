'use strict';
var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  fs = require('fs'),
  APP_PATH = '../../generators/app',
  TEMPLATES_PATH = APP_PATH + '/test_templates/bower_json',
  PROJECT_NAME = 'Test project';

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: PROJECT_NAME,
        onlyFrontend: true,
        cssFramework: 'Bootstrap',
        useFontAwesome: false
      })
      .toPromise();
  });

  it('Creates bower.json using Bootstrap without FontAwesome', function () {
    var filepath = path.join(__dirname, TEMPLATES_PATH + '/bootstrap_no_fa.json'),
      JSONContent = null;

    try {
      JSONContent = JSON.parse(fs.readFileSync(filepath, { encoding: 'UTF-8' }));
    } catch(e) {
      JSONContent = null;
    }

    assert.file(['bower.json']);
    assert.jsonFileContent('bower.json', JSONContent);
    assert.noFileContent('bower.json', 'font-awesome');
  });
});

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: PROJECT_NAME,
        onlyFrontend: true,
        cssFramework: 'Bootstrap',
        useFontAwesome: true
      })
      .toPromise();
  });

  it('Creates bower.json using Bootstrap and FontAwesome', function () {
    var filepath = path.join(__dirname, TEMPLATES_PATH + '/bootstrap_fa.json'),
      JSONContent = null;

    try {
      JSONContent = JSON.parse(fs.readFileSync(filepath, { encoding: 'UTF-8' }));
    } catch(e) {
      JSONContent = null;
    }

    assert.file(['bower.json']);
    assert.jsonFileContent('bower.json', JSONContent);
  });
});