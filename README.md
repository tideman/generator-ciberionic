# generator-ciberionic [![NPM version][npm-image]][npm-url] [![travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Projectstructure, devtools and taskrunners for a Ciber Ionic project

![generator-ciberionic](other/keyboard.gif)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ciberionic using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ciberionic
```

Then generate your new project:

```bash
yo ciberionic
```

## CiberIonic Scaffold

This is the scaffold used as base for a Ciber Ionic Project.
It includes all the tools to create a superclean production folder in www.

The purpose of this project was to have a seperate development folder and a base sample app
conform all the specs of a Ciber Ionic app.

It has a development folder 'app' in which you can create all your custom code

### Styles
Sass is used for styles and can be created in the SCSS folder
Include the files in the main.scss

### Models
All your models can be added in /core/models
Include them in /core/models/moduls.module.js

### Services
All you services can be created in /core/serviceswatch
Include them in /core/services/service.module.js

You get your project with 'npm install' and 'bower install' already run
Start your project with 'gulp' or 'npm gulp' if you don't have gulp globally installed

Gulp will generate a .tmp folder and will serve your app from it.
This is a preview of the production folder with the difference that it has included all scriptfiles in the index.html 
all seperately fro easy debugging.

Gulp will watch all the files in /app and re-generate on change

### Docs
Ngdocs is included. Keep your comments up to date. Run 'gulp ngdocs'
to generate a docs folder in your root. Cd into it and run a server to view it.

### Production
To create your production folder run 'gulp -b'
This will copy all the files to your www folder and do some extra tasks like concatenating, uglyfing
and adding hashes to the files.

After your produciton task is run you can do a 'ionic prepare' and 'ionic build' to generate the correct platform folders

### Hooks
Several hooks for Ionic are added to keep the plugin and platform sections in your json up-to-date




## License

MIT © [ing. P.T. Kroon](ciber.nl)


[npm-image]: https://badge.fury.io/js/generator-ciberionic.svg
[npm-url]: https://npmjs.org/package/generator-ciberionic
[travis-image]: https://travis-ci.org/tideman/generator-ciberionic.svg?branch=master
[travis-url]: https://travis-ci.org/tideman/generator-ciberionic
[daviddm-image]: https://david-dm.org/tideman/generator-ciberionic.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tideman/generator-ciberionic
