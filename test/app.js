'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-gen-generator-test:app', function () {
  console.log('dir:', __dirname);

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true});
    done();
  });

  it('creates files', function (done) {
    assert.equal(1, 1);
    done();
  });
});
