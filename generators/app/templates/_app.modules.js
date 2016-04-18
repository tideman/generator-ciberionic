/* global angular */
(function() {
  'use strict';
  /**
   * @ngdoc overview
   * @name app
   * @description
   * <h1><%= appName %></h1>
   * <p>Primairy app.module where we can define all core and features modules that we use in this App</p>
   * @example
   <pre>
   angular
   .module('<%= ngModulName %>', [
   //Everybody has access to these. Some of these modules like the app.core module have child modules.
   'ionic',
   '<%= ngModulName %>.core',

   // Feature areas
   '<%= ngModulName %>.dashboard',
   ]);
   </pre>
   */
  angular
    .module('<%= ngModulName %>', [
    /**
     * Everybody has access to these. Some of these modules like the app.core module have child modules.
     */
      'ionic',
      '<%= ngModulName %>.core',

    /**
     * Feature areas
     */
      '<%= ngModulName %>.dashboard',


    ]);
})(); // End Strict
