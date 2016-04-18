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
  DashboardCtrl.$inject = [];

  // Start the DashboardCtrl
  function DashboardCtrl() {
    var dashboard = this;

    // Activate all methods
    activateDashboard();

    function activateDashboard() {
      return dashboard;
    }
  }
})();

