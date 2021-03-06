/* global angular*/
(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name core.services
   * @requires <%=ngModulName %>
   * @requires core
   * @description
   * <h1>Core Services</h1>
   * <p>This module allows to define all the service modules used in the App</p>
   */
  angular
    .module('<%=ngModulName %>.core.services', [
      /* Angular Modules */

      /* Cross App Modules */
      'service.securestorage'

      /* 3rd-party Modules */
    ]);
})(); // End Strict
