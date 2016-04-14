/* global angular */
(function () {
  'use strict';

  angular
    .module('<%= ngModulName %>.core', [
      /* Angular Modules */

      /* Cross App Modules */
      'common.models',
      'common.services'

      /* 3rd-party Modules */
    ]);
})(); // End Strict
