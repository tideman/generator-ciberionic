/* global angular */
(function() {
  'use strict';
  /**
  * @ngdoc object
  * @name core.appload.route
  * @requires <%=ngModulName %>
  * @requires core
  * @requires core.appload
  * @requires core.constants
  * @description
  * <h1>Core Appload Route</h1>
  * <p>This module configures the route, views, controllers and templates used by this module.</p>
  * <p>!Important: Define the Route Options in the appload.constants.js file</p>
  */
  angular
    .module('<%=ngModulName %>.core.appload')
    .config(route);
  route.$inject = ['$stateProvider', 'APPLOADCONSTANTS'];

  function route($stateProvider, APPLOADCONSTANTS) {
    $stateProvider
    .state( APPLOADCONSTANTS.ROUTE.STATE, {
      url: APPLOADCONSTANTS.ROUTE.URL,
      templateUrl: APPLOADCONSTANTS.ROUTE.TEMPLATEURL,
      controller: APPLOADCONSTANTS.ROUTE.CONTROLLER,
      controllerAs: APPLOADCONSTANTS.ROUTE.CONTROLLERAS
    });
  }
})();
