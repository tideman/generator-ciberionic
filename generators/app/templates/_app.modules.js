(function() {
    'use strict';

angular
  .module('<%= ngModulName %>', [
    /**
     * Everybody has access to these.
     */
    'ionic',
    '<%= ngModulName %>.core',
    //'app.run',
    '<%= ngModulName %>.layout',

    /**
     * Feature areas
     */
    '<%= ngModulName %>.dashboard',
  ]);
})(); // End Strict
