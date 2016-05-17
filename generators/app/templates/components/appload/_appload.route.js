/* global angular */
(function () {
  'use strict';
  /**
  * @ngdoc object
  * @name appload.route
  * @requires <%=ngModulName %>
  * @requires https://github.com/angular-ui/ui-router/wiki/Quick-Reference#stateprovider-1
  * @requires appload.constant:APPLOADCONSTANTS
  * @description
  * <h1>Core Appload Route</h1>
  * <p>This module configures the route, views, controllers and templates used by this module.</p>
  * <p>!Important: Define the Route Options in the Constants file for this module</p>
  */
  angular
    .module('<%=ngModulName %>.appload')
    .config(route);
  route.$inject = ['$stateProvider', 'APPLOADCONSTANTS'];

  function route($stateProvider, APPLOADCONSTANTS) {
    $stateProvider
    .state(APPLOADCONSTANTS.ROUTE.STATE, {
      url: APPLOADCONSTANTS.ROUTE.URL,
      templateUrl: APPLOADCONSTANTS.ROUTE.TEMPLATEURL,
      controller: APPLOADCONSTANTS.ROUTE.CONTROLLER,
      controllerAs: APPLOADCONSTANTS.ROUTE.CONTROLLERAS
    });
  }
})();
