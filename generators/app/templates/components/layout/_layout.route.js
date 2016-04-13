(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.layout')
    .config(route);
  route.$inject = ['$stateProvider'];

  function route($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        //abstract: true,
        templateUrl: 'layout/layout.html',
        controller: 'LayoutCtrl',
        controllerAs: 'layout'
      });
  }
})();
