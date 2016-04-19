'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mout = require('mout');
var mkdirp = require('mkdirp');
var cordova = require('cordova');
var s = require('underscore.string');
var utils = require('../utils');

module.exports = yeoman.Base.extend({
  prompting: {
    askForNames: function () {
      var done = this.async();

      // Display a welcome
      this.log(
        utils.welcome
      );

      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What\'s the app name?',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'userName',
        message: 'The author\'s name? (for config files)',
        default: this.user.git.name || 'Your Name'
      },
        {
          type: 'input',
          name: 'userEmail',
          message: 'Author email? (for config files)',
          default: this.user.git.email || 'email@example.com'

        }];

      this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.ngModulName = s.classify(this.appName);
        this.userName = props.userName;
        this.userEmail = props.userEmail;
        done();
      }.bind(this));
    },
    askForAppId: function askForAppId() {
      var done = this.async();
      this.prompt([{
        type: 'input',
        name: 'appId',
        message: 'The app id?',
        default: 'com.' + s.classify(this.userName).toLowerCase() + '.' + s.classify(this.appName).toLowerCase()
      }], function (props) {
        this.appId = props.appId;
        done();
      }.bind(this));
    },
    askForPlugins: function () {
      var done = this.async();

      this.prompt(utils.plugins.prompts, function (props) {
        this.plugins = props.plugins;
        done();
      }.bind(this));
    }
  },
  configuring: {
    commonVariables: function () {
      this.log('CommonVariables');
      this.appName = this.appName || this.options.appName || path.basename(process.cwd());
      this.appName = s.camelize(s.slugify(s.humanize(this.appname)));
      this.appName = mout.string.pascalCase(this.appName);
      this.appId = this.options.appId || 'com.example.' + this.appName;
    },

    setupEnv: function setupEnv() {
      this.log('Setup Env');
      // Removes thumbnail cache files
      var hiddenFiles = ['Thumbs.db', '.DS_Store'];

      fs.readdir('.', function (err, files) {
        if (err) {
          this.log('readdir err: ', err);
        } else {
          hiddenFiles = hiddenFiles.concat(files.filter(function (item) {
            return /^\./.test(item);
          }));
          hiddenFiles.forEach(function (filename) {
            var file = path.join(process.cwd(), filename);
            if (fs.existsSync(file)) {
              fs.unlinkSync(file);
            }
          });
        }
      });
    }
  },
  writing: {
    cordovaInit: function cordovaInit() {
      var done = this.async();
      this.log("Creating cordova app: " + this.appName);
      try {
        cordova.create(process.cwd(), this.appId, this.appName, function (error) {
          if (error) {
            this.log(chalk.yellow(error.message + ': Skipping `cordova create`'));
          } else {
            this.log(chalk.yellow('Created a new Cordova project with name "' + this.appName + '" and id "' + this.appId + '"'));
            // remove cordova created files, we will write later
            var cwd = process.cwd();
            fs.unlinkSync(cwd + '/www/js/index.js');
            fs.rmdirSync(cwd + '/www/js');

            fs.unlinkSync(cwd + '/hooks/README.md');
            fs.rmdirSync(cwd + '/hooks');

            fs.unlinkSync(cwd + '/www/css/index.css');
            fs.rmdirSync(cwd + '/www/css');

            fs.unlinkSync(cwd + '/www/img/logo.png');
            fs.rmdirSync(cwd + '/www/img');

            fs.unlinkSync(cwd + '/www/index.html');
          }
          done();
        }.bind(this));
      } catch (err) {
        console.error('Failed to create cordova proect: ' + err);
        process.exit(1);
      }
    },

    createRootStructure: function createRootStructure() {
      this.log('Create root structure');

      this.directory('hooks', 'hooks');

      mkdirp('app', function (err) {
        if (err) {
          this.log(err);
        } else {
          this.log('Created app folder');
        }
      }.bind(this));

      // overwrite config.xml with ejs-ed one
      this.fs.copyTpl(
        this.templatePath('_config.xml'),
        this.destinationPath('./config.xml'),
        {
          appName: this.appName,
          userName: this.userName,
          userEmail: this.userEmail,
          widgetId: this.appId
        }
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('./bower.json'), {appName: this.appName});

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('./package.json'),
        {
          appName: s.underscored(this.appName),
          userName: this.userName,
          userEmail: this.userEmail
        }
      );
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('./gulpfile.js'),
        {appName: this.appName, ngModulName: s.classify(this.appName)}
      );
    },

    createProject: function createProject() {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {title: this.appName, ngModulName: s.classify(this.appName)}
      );

      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );

      this.fs.copyTpl(
        this.templatePath('_app.modules.js'),
        this.destinationPath('app/app.modules.js'),
        {appName: this.appName, ngModulName: s.classify(this.appName)}
      );

      this.directory('scss', 'app/scss', true);

      this.fs.copyTpl(
        this.templatePath('icons/_own-icons-template.css'),
        this.destinationPath('app/icons/own-icons-template.css'),
        {appName: this.appName, ngModulName: s.classify(this.appName)}
      );

      // CORE
      this.fs.copyTpl(
        this.templatePath('components/core/_core.config.js'),
        this.destinationPath('app/core/core.config.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/_core.constants.js'),
        this.destinationPath('app/core/core.constants.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/_core.module.js'),
        this.destinationPath('app/core/core.module.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/_core.route.js'),
        this.destinationPath('app/core/core.route.js'),
        {ngModulName: s.classify(this.appName)}
      );

      // CORE LAYOUT
      this.fs.copyTpl(
        this.templatePath('components/core/layout/_layout.config.js'),
        this.destinationPath('app/core/layout/layout.config.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/layout/_layout.controller.js'),
        this.destinationPath('app/core/layout/layout.controller.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/layout/_layout.html'),
        this.destinationPath('app/core/layout/layout.html')
      );
      this.fs.copyTpl(
        this.templatePath('components/core/layout/_layout.module.js'),
        this.destinationPath('app/core/layout/layout.module.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/layout/_layout.route.js'),
        this.destinationPath('app/core/layout/layout.route.js'),
        {ngModulName: s.classify(this.appName)}
      );

      // CORE APPLOAD
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.config.js'),
        this.destinationPath('app/core/appload/appload.config.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.constants.js'),
        this.destinationPath('app/core/appload/appload.constants.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.controller.js'),
        this.destinationPath('app/core/appload/appload.controller.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.html'),
        this.destinationPath('app/core/appload/appload.html'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.module.js'),
        this.destinationPath('app/core/appload/appload.module.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.route.js'),
        this.destinationPath('app/core/appload/appload.route.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/core/appload/_appload.run.js'),
        this.destinationPath('app/core/appload/appload.run.js'),
        {ngModulName: s.classify(this.appName)}
      );

      // COMPONENTS
      // SERVICES
      this.fs.copyTpl(
        this.templatePath('components/common/services/_services.module.js'),
        this.destinationPath('app/common/services/services.module.js'),
        {ngModulName: s.classify(this.appName)}
      );

      // SECURESTORAGE
      this.fs.copyTpl(
        this.templatePath('components/common/services/securestorage/_securestorage.constants.js'),
        this.destinationPath('app/common/services/securestorage/securestorage.constants.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/common/services/securestorage/_securestorage.module.js'),
        this.destinationPath('app/common/services/securestorage/securestorage.module.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/common/services/securestorage/_securestorage.service.js'),
        this.destinationPath('app/common/services/securestorage/securestorage.service.js'),
        {ngModulName: s.classify(this.appName)}
      );

      // MODELS
      this.fs.copyTpl(
        this.templatePath('components/common/models/_models.module.js'),
        this.destinationPath('app/common/models/models.module.js'),
        {ngModulName: s.classify(this.appName)}
      );

      // DASHBOARD
      this.fs.copyTpl(
        this.templatePath('components/dashboard/_dashboard.config.js'),
        this.destinationPath('app/dashboard/dashboard.config.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/dashboard/_dashboard.controller.js'),
        this.destinationPath('app/dashboard/dashboard.controller.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/dashboard/_dashboard.html'),
        this.destinationPath('app/dashboard/dashboard.html')
      );
      this.fs.copyTpl(
        this.templatePath('components/dashboard/_dashboard.module.js'),
        this.destinationPath('app/dashboard/dashboard.module.js'),
        {ngModulName: s.classify(this.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('components/dashboard/_dashboard.route.js'),
        this.destinationPath('app/dashboard/dashboard.route.js'),
        {ngModulName: s.classify(this.appName)}
      );
    },

    installPlugins: function installPlugins() {
      this.log(chalk.yellow('\nInstall plugins registered at plugins.cordova.io: ') + chalk.green('grunt plugin:add:org.apache.cordova.globalization'));
      this.log(chalk.yellow('Or install plugins direct from source: ') + chalk.green('grunt plugin:add:https://github.com/apache/cordova-plugin-console.git\n'));
      this.log('InstallPlugins');

      if (this.plugins.length > 0) {
        this.log(chalk.yellow('Installing selected Cordova plugins, please wait.'));

        // Turns out plugin() doesn't accept a callback so we try/catch instead
        try {
          cordova.plugin('add', this.plugins);
          this.log('plug-ins added');
        } catch (e) {
          this.log(e);
          this.log.error(chalk.red('Please run `yo ionic` in an empty directory, or in that of an already existing cordova project.'));
          process.exit(1);
        }
      }
    }
  },

  install: function () {
    this.installDependencies();
  }
});
