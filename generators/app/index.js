'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mout = require('mout');
var mkdirp = require('mkdirp');
var cordova = require('cordova');
var wiring = require("html-wiring");
var _ = require("lodash");
var s = require('underscore.string');
var utils = require('../utils');

var devPath = path.join(process.cwd(), 'app');
var prodPath = path.join(process.cwd(), 'www');

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
            //this.log(utils.plugins);
            this.prompt(utils.plugins.prompts, function (props) {
                this.plugins = props.plugins;
                done();
            }.bind(this));
        },
        askForStarter: function askForStarter() {
            var done = this.async();
            this.log('starter');
            this.prompt([{
                type: 'list',
                name: 'starter',
                message: 'Which starter template would you like to use?',
                choices: _.pluck(utils.starters.templates, 'name'),
                default: 0
            }], function (props) {
                this.starter = _.find(utils.starters.templates, { name: props.starter });
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
            this.devPath = 'app';
            //this.root = process.cwd();
            //this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../package.json')));
        },

        setupEnv: function setupEnv() {
            this.log('Setup Env');
            // Removes thumbnail cache files
            var hidden_files = ['Thumbs.db', '.DS_Store'];

            fs.readdir('.', function (err, files) {
                hidden_files = hidden_files.concat(files.filter(function (item) {
                    return /^\./.test(item)
                }));
                hidden_files.forEach(function (filename) {
                    var file = path.join(process.cwd(), filename);
                    if (fs.existsSync(file)) {
                        fs.unlinkSync(file);
                    }

                });
            });

            // Copies the contents of the generator example app
            // directory into your users new application path
            //this.sourceRoot(path.join(__dirname, '../templates/'));
            // this.directory('common/root', '.', true);
        },
    },
    writing: {
        cordovaInit: function cordovaInit() {
            var done = this.async();
            console.log("Creating cordova app: " + this.appName);
            try {
                cordova.create(process.cwd(), this.appId, this.appName, function (error) {
                    if (error) {
                        console.log(chalk.yellow(error.message + ': Skipping `cordova create`'));
                    } else {
                        console.log(chalk.yellow('Created a new Cordova project with name "' + this.appName + '" and id "' + this.appId + '"'));
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
                        //fs.unlinkSync(cwd + '/config.xml');
                    }
                    done();
                }.bind(this));
            } catch (err) {
                console.error('Failed to create cordova proect: ' + err);
                process.exit(1);
            }
        },

        createProjectStructure: function createProjectStructure() {
            this.log('Create project structure');
            //var done = this.async();
            //this.directory('hooks', 'hooks');

            mkdirp('app', function (err) {
                if (err) console.error(err)
                else console.log('created app folder');
            });

            this.fs.copyTpl(
                this.templatePath('_config.xml'),
                this.destinationPath('./config.xml'),
                { appName: this.appName,
                    userName: this.userName,
                    userEmail: this.userEmail,
                    widgetId: this.appId }
            );

            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('app/index.html'),
                { title: this.appName, ngModulName: s.classify(this.appName)}
            );

            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('./bower.json'), {appName: this.appName});

            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('./package.json'),
                { appName: s.underscored(this.appName),
                    userName: this.userName,
                    userEmail: this.userEmail }
            );
            this.fs.copyTpl(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('./gulpfile.js'),
                { ngModulName: s.classify(this.appName) }
            );

        },





        installPlugins: function installPlugins() {
            console.log(chalk.yellow('\nInstall plugins registered at plugins.cordova.io: ') + chalk.green('grunt plugin:add:org.apache.cordova.globalization'));
            console.log(chalk.yellow('Or install plugins direct from source: ') + chalk.green('grunt plugin:add:https://github.com/apache/cordova-plugin-console.git\n'));
            this.log('InstallPlugins');
            //var done = this.async();
            if (this.plugins.length > 0) {
                this.log(chalk.yellow('Installing selected Cordova plugins, please wait.'));

                // Turns out plugin() doesn't accept a callback so we try/catch instead
                try {
                    cordova.plugin('add', this.plugins);
                    this.log('plug-ins added');
                    //done();
                } catch (e) {
                    this.log(e);
                    this.log.error(chalk.red('Please run `yo ionic` in an empty directory, or in that of an already existing cordova project.'));
                    process.exit(1);
                }
            }
        },

        installStarter: function installStarter() {
            this.log(chalk.yellow('Installing starter template. Please wait'));
            //var done = this.async();
            //
            //var callback = function (error, remote) {
            //    if (error) {
            //        done(error);
            //    }
            //
            //    // Template remote initialization: Copy from remote root folder (.) to working directory (/app)
            //    remote.directory('.', 'app');
            //
            //    this.starterCache = remote.cachePath;
            //    done();
            //}.bind(this);
            //this.log('THIS STARTER: ', this.starter);
            //if (this.starter && this.starter.path) {
            //    this.log(chalk.bgYellow(chalk.black('WARN')) +
            //        chalk.magenta(' Getting the template from a local path.  This should only be used for developing new templates.'));
            //    this.remoteDir(this.starter.path, callback);
            //} else if (this.starter.url) {
            //    this.remote(this.starter.url, callback, true);
            //} else {
            //    this.remote(this.starter.user, this.starter.repo, 'master', callback, true);
            //}
        }
    },

    install: function () {
        this.installDependencies();
    }
});
