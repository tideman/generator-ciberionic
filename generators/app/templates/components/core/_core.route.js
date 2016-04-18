/* global angular */
(function() {
  'use strict';
  /**
   * @ngdoc object
   * @name core.route
   * @description
   * <h1>Core Route</h1>
   * <p>The Core Route module is a Cross App Config Module which allows you the specify the default route if a valid route is not defined by the user in the App</p>
   * @requires <%=ngModulName %>
   * @requires core
   * @requires core.constants
   * @requires https://github.com/angular-ui/ui-router
   */
  angular
    .module('<%=ngModulName %>.core')
    .config(route);
  // Inject the $urlRouterProvider
  route.$inject = ['$urlRouterProvider', 'CORECONSTANTS'];

  // Set the $urlRouterProvider.otherwise to the default state defined in the CORECONSTANTS.DEFAULT_URL
  function route($urlRouterProvider, CORECONSTANTS) {
    $urlRouterProvider.otherwise( CORECONSTANTS.DEFAULT_URL );
  }
})();
