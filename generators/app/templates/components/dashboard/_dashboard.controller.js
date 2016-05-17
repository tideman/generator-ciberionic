/* global angular */
(function () {
  'use strict';
  /**
   * @ngdoc controller
   * @name dashboard.controller:DashboardCtrl
   * @requires <%=ngModulName %>
   * @requires core
   * @description
   * <h1>Dashboard Controller</h1>
   * <p>The Dashboard controller </p>
   * <h2>Methods</h2>
   *
   */
  angular
    .module('<%=ngModulName %>.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);

  // Inject dependencies
  DashboardCtrl.$inject = [ '$ionicPopup' ];

  // Start the DashboardCtrl
  function DashboardCtrl( $ionicPopup ) {
    var dashboard = this;

    // Activate all methods
    activateDashboard();

    function activateDashboard() {

      // Function to skip the intro
      dashboard.popUp = function(){
        var popUp = $ionicPopup.confirm({
          title: 'CiberIonic',
          template: 'Welcome to your App created with the CiberIonic Generator! Who is your biggest Hero?',
          buttons: [
            { text : 'Niek' },
            {
              text : 'Tijmen',
              onTap: function(){
                alert( 'You have chosen Niek! Well done ;)' );
              }
            }
          ]
        });
      };
      // Open Popup
      dashboard.popUp();

      return dashboard;
    }
  }
})();
