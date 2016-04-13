(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.core')
    .config(function( $ionicConfigProvider ){
      // Always align the title in the center
      $ionicConfigProvider.navBar.alignTitle('center');

    });
})();
