/* global angular */
(function() {
  'use strict';
  /**
  * @ngdoc overview
  * @name core.appload
  * @requires <%=ngModulName %>
  * @requires core
  * @description
  * <h1>Core Appload</h1>
  * <p>This module offers functionalities that can be run on startup.</p>
  * <p>This module is loaded after the Splashscreen and before the Main page, f.e. the Dashboard page or Homepage</p>
  */
  angular
  .module('<%=ngModulName %>.core.appload', []);
})(); // End Strict
