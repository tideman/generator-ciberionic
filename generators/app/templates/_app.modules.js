/* global angular */
(function () {
  'use strict';

  angular
    .module('<%= ngModulName %>', [
    /**
     * Everybody has access to these.
     */
      'ionic',
      '<%= ngModulName %>.core',
      '<%= ngModulName %>.layout',

    /**
     * Feature areas
     */
      '<%= ngModulName %>.dashboard'
    ]);
})(); // End Strict
