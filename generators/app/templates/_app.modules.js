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
     //'app.device',
     //'app.useroptions',
     //'app.userprofile',
     //'app.dashboard',
     //'app.purchase-order',
     //'app.help',
     //'app.appload',
     //'app.login',

  ]);
})(); // End Strict
