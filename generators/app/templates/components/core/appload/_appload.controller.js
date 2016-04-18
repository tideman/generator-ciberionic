/* global angular */
(function() {
  'use strict';
  /**
  * @ngdoc controller
  * @name core.appload.controller:ApploadCtrl
  * @requires <%=ngModulName %>
  * @requires core
  * @requires core.appload
  * @requires core.appload.constants
  * @description
  * <h1>Core Appload Controller</h1>
  * <p>The Core Appload Controller allows you to control the functionalities on App Startup before going to the Dashboard or Homepage.</p>
  * <p>Comes in handy when f.e. you would like to, for example, verify a networkconnection or verify a session.</p>
  */
  angular
    .module('<%=ngModulName %>.core.appload')
    .controller('ApploadCtrl', ApploadCtrl);

  // Inject dependencies
  ApploadCtrl.$inject = ['$ionicPlatform', '$window', 'APPLOADCONSTANTS', '$state'];

  // Start the DashboardCtrl
  function ApploadCtrl($ionicPlatform, $window, APPLOADCONSTANTS, $state) {
    var appload = this;

    // Activate all methods
    activateAppload();

    function activateAppload() {
      // Wait until IonicPlatform is ready
      $ionicPlatform.ready(function() {
        /**
         * Check if this is a device or browser
         */
        if ($window.cordova){
          console.log('cordova check => device');
          $state.go('<%= ngModulName%>.dashboard');
        } else {
          console.log('cordova check => browser');
          $state.go('<%= ngModulName%>.dashboard');
        }
        return appload;
      });
    }
  }
})();
