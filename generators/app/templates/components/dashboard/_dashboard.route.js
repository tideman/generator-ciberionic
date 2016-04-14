/* global angular */
(function () {
  'use strict';

  angular
    .module('<%= ngModulName %>.dashboard')
    .config(route);
  route.$inject = ['$stateProvider'];

  function route($stateProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          appContent: {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
          }
        }
      });
  }
})();
