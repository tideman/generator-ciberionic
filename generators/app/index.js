'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mout = require('mout');
var cordova = require('cordova');
var wiring = require("html-wiring");
var _ = require('underscore.string');
var utils = require('../utils');

var appPath = path.join(process.cwd(), 'app');

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
                this.ngModulName = _.classify(this.appName);
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
                default: 'com.' + _.classify(this.userName).toLowerCase() + '.' + _.classify(this.appName).toLowerCase()
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
        }
    },
    configuring: {
        commonVariables: function () {
            this.log('CommonVariables');
            this.appName = this.appName || this.options.appName || path.basename(process.cwd());
            this.appName = mout.string.pascalCase(this.appName);
            this.appId = this.options.appId || 'com.example.' + this.appName;
            this.appPath = 'app';
            //this.root = process.cwd();
            //this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../package.json')));
        },

        setupEnv: function setupEnv() {
            this.log('Setup Env');
            // Removes thumbnail cache files
            var invisibleFiles = ['Thumbs.db', '.DS_Store'];
            invisibleFiles.forEach(function (filename) {
                var file = path.join(process.cwd(), filename);
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });
            // Copies the contents of the generator example app
            // directory into your users new application path
            this.sourceRoot(path.join(__dirname, '../templates/'));
           // this.directory('common/root', '.', true);
        },

        packageFiles: function packageFiles() {
            this.log('packageFiles');
            //this.template('common/_bower.json', 'bower.json');
            //this.template('common/_bowerrc', '.bowerrc');
            this.template('common/_package.json', 'package.json');
            this.template('common/_gulpfile.js', 'Gulpfile.js');
            //this.template('common/_gitignore', '.gitignore');
        }
    },
    writing: {
        cordovaInit: function cordovaInit() {
            this.log('CorodvaInit');
            var done = this.async();
            cordova.create('.', this.appId, this.appName, function (error) {
                if (error) {
                    this.log(chalk.yellow(error.message + ': Skipping `cordova create`'));
                } else {
                    this.log(chalk.yellow('Created a new Cordova project with name "' + this.appName + '" and id "' + this.appId + '"'));
                }
                done();
            }.bind(this));
        },

        installPlugins: function installPlugins() {
            //console.log(chalk.yellow('\nInstall plugins registered at plugins.cordova.io: ') + chalk.green('grunt plugin:add:org.apache.cordova.globalization'));
            //console.log(chalk.yellow('Or install plugins direct from source: ') + chalk.green('grunt plugin:add:https://github.com/apache/cordova-plugin-console.git\n'));
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
