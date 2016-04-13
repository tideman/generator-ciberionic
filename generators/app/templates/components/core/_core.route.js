(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.core')
    .config(route);

  route.$inject = ['$urlRouterProvider'];

  function route($urlRouterProvider) {
    $urlRouterProvider.otherwise('appload');
  }
})();
