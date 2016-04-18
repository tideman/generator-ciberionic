/* global angular */
(function() {
  'use strict';
  /**
   * @ngdoc object
   * @name dashboard.route
   * @requires <%=ngModulName %>
   * @requires core
   * @description
   * <h1>Dashboard Route</h1>
   * <p>This module configures the route, views, controllers and templates used by this module.</p>
   */
  angular
    .module('<%= ngModulName%>.dashboard')
    .config(route);
  route.$inject = ['$stateProvider'];

  function route($stateProvider) {
    $stateProvider
      .state('<%=ngModulName %>.dashboard', {
        url: 'dashboard',
        views: {
          'appContent': {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
          }
        }
      });
  }
})();
