## CiberIonic Scaffold

This is the scaffold used as base for a Ciber Ionic Project.
It includes all the tools to create a superclean production folder in www.

The purpose of this project was to have a seperate development folder and a base sample app
conform all the specs of a Ciber Ionic app.

It has a development folder 'app' in which you can create all your custom code

### The projectructure
```
├── README.md
├── .tmp
├── app
│   ├── app.modules.js
│   ├── common
│   │   ├── models
│   │   │   └── models.module.js
│   │   └── services
│   │       ├── securestorage
│   │       │   ├── securestorage.constants.js
│   │       │   ├── securestorage.module.js
│   │       │   └── securestorage.service.js
│   │       └── services.module.js
│   ├── core
│   │   ├── appload
│   │   │   ├── appload.config.js
│   │   │   ├── appload.constants.js
│   │   │   ├── appload.controller.js
│   │   │   ├── appload.html
│   │   │   ├── appload.module.js
│   │   │   ├── appload.route.js
│   │   │   └── appload.run.js
│   │   ├── core.config.js
│   │   ├── core.constants.js
│   │   ├── core.module.js
│   │   ├── core.route.js
│   │   └── layout
│   │       ├── layout.config.js
│   │       ├── layout.controller.js
│   │       ├── layout.html
│   │       ├── layout.module.js
│   │       └── layout.route.js
│   ├── dashboard
│   │   ├── dashboard.config.js
│   │   ├── dashboard.controller.js
│   │   ├── dashboard.html
│   │   ├── dashboard.module.js
│   │   └── dashboard.route.js
│   ├── index.html
│   └── scss
│       ├── _fonts.scss
│       ├── _variables.scss
│       ├── ionic-styles.scss
│       └── main.scss
├── bower_components
├── docs
├── hooks
│   ├── after_platform_add
│   │   └── install_plugins.js
│   ├── after_plugin_add
│   │   └── register_plugins.js
│   ├── after_plugin_rm
│   │   └── deregister_plugins.js
│   ├── after_prepare
│   │   ├── icons_and_splashscreens.js
│   │   └── update_platform_config.js
│   └── before_platform_add
│       └── init_directories.js
├── node_modules
├── platforms
├── plugins
├── www
├── bower.json
├── config.xml
├── gulpfile.js
└── package.json
```

### Styles
Sass is used for styles and can be created in the SCSS folder.
Include the files in the main.scss

### Models
All your models can be added in /core/models.
Include them in /core/models/moduls.module.js

### Services
All you services can be created in /core/serviceswatch.
Include them in /core/services/service.module.js

You get your project with 'npm install' and 'bower install' already run.
Start your project with 'gulp' or 'npm gulp' if you don't have gulp globally installed.

### Gulp
Gulp will generate a .tmp folder and will serve your app from it.
This is a preview of the production folder with the difference that it has included all scriptfiles in the index.html 
all seperately for easy debugging.

Gulp will watch all the files in /app and re-generate on change

### Gulp Tasks

- [ngdocs] Will generate docs
- [clean] Will delete the targetdir (www | .tmp)
- [styles] Will process all scss to CSS ( compressed | expanded)
- [scripts] Will build templatecache, copy scripts on build will concat minsafe, uglify and versionize 
- [fonts] Will copy the fonts
- [iconfont] Will generate a iconfont if you put .svg's in /app/icons 
- [images] Will copy images out of /app/images to targetdir
- [jsHint] 
- [vendor] Moves all bower frontend scripts into one vendor.js
- [index] injects all necessary files correctly into index.html depending on kind of build (dev | build)
   Also keeps track of the order of the script files!
- [serve] Start local Express server
- [ionic:emulate] Ionic emulate wrapper 
- [ionic:run] Ionic run wrapper
- [icon] Ionic resources wrapper  
- [splash] Ionic resource splash
- [select] Select emulator device
- [ripple] Ripple emulator
- [watchers] Watch all files in dev
- [noop] Empty function for a task placeholder in if else shorthand in case of build

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


