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

  DashboardCtrl.$inject = [ '$ionicLoading', '$scope', 'PurchaseOrder' ];

  function DashboardCtrl( $ionicLoading, $scope, PurchaseOrder ) {
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
      PurchaseOrder.getAllPurchaseOrders().then(function(purchaseOrders){
        dashboard.lastupdate = new Date();
        dashboard.orders = purchaseOrders;
        // console.log('orders: ', dashboard.orders);
      }, function(errormessage) {
        console.log('getAllPurchaseOrders Error: ');
        console.log( errormessage );
      }).finally(function(){
        $ionicLoading.hide();
      });

    }


    dashboard.setSelected = function (idSelectedTable) {
       dashboard.idSelectedTable = idSelectedTable;
    };

    dashboard.clearSearch = function() {
      dashboard.search = '';
    };

    dashboard.doRefresh = function(){
      PurchaseOrder.getAllPurchaseOrders().then(function(purchaseOrders){
        dashboard.lastupdate = new Date();
        dashboard.orders = purchaseOrders;
        console.log('order: ', dashboard.orders);
      }, function(errormessage) {
        console.log('getAllPurchaseOrders Error: ', errormessage);
      }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

  }
})();
