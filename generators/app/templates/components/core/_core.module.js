/* global angular */
(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name core
   * @requires <%=ngModulName %>

   * @description
   * <h1>Core Module</h1>
   * <p>This module allows to include Core Angular Modules that we need for a MVP App.</p>
   * <p>!Important: Configure the DEFAULT_URL in the core.constants.js to set the default App Route.</p>
   * @example
   * <pre>
   (function() {
        'use strict';

        angular
        .module('<%= ngModulName %>.core', [
          // Angular Modules

          // Core Cross App Modules
          // Example to load modules necessary for the MVP App to work
          '<%= ngModulName %>.core.layout',
          '<%= ngModulName %>.core.appload',
          '<%= ngModulName %>.core.models',
          '<%= ngModulName %>.core.services',

          //3rd-party Modules

        ]);

      })(); // End Strict
   </pre>
   */

  angular
    .module('<%=ngModulName %>.core', [
      /* Angular Modules */
      /* Cross App Modules */
      '<%= ngModulName %>.core.models',
      '<%= ngModulName %>.core.services',

      '<%= ngModulName %>.core.appload',
      '<%= ngModulName %>.core.layout'
      /* 3rd-party Modules */
    ]);
})(); // End Strict
