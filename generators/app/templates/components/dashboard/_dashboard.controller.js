/**
 * @ngdoc
 * @name app.dashboard controller
 * @description
 * The controller for the Dashboard
 *
 */
(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = [ '$ionicLoading', '$scope','$timeout'];

  function DashboardCtrl( $ionicLoading, $scope, $timeout) {
    var dashboard = this;
    dashboard.idSelectedTable = null;
    dashboard.lastupdate = false;

    activate();

    function activate() {
      console.log( 'DashboardCtrl Loaded' );
      // Show Loading
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
      $timeout($ionicLoading.hide(), 3000);

    }


    dashboard.setSelected = function (idSelectedTable) {
       dashboard.idSelectedTable = idSelectedTable;
    };

    dashboard.clearSearch = function() {
      dashboard.search = '';
    };

    dashboard.doRefresh = function(){
      console.log('Do refresh');
    };

  }
})();
