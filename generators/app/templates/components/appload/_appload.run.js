/* global angular */
/* global cordova */
(function () {
  'use strict';
  /**
  * @ngdoc service
  * @name core.appload.run
  * @requires <%=ngModulName %>
  * @requires http://ionicframework.com/docs/api/utility/ionic.Platform/
  * @requires $window
  * @description
  * <h1>Appload Run</h1>
  * <p>Define the functionalities that need to be run on startup</p>
  */
  angular
  .module('<%=ngModulName %>.appload')
  .run(runBlock);
  // Inject dependencies
  runBlock.$inject = ['$ionicPlatform', '$window'];

  // Run the function once on App Startup
  function runBlock($ionicPlatform, $window) {
    // Run if Ionic is ready
    $ionicPlatform.ready(function () {
      console.log('Ionic Ready on Run!');
      /**
      * Keyboard options
      */
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      /**
      * Statusbar options
      */
      if ($window.StatusBar) {
        $window.StatusBar.styleLightContent();
      }
    }); // End $ionicPlatform.ready()
  }
})();
