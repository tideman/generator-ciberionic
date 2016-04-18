/* global angular */
(function() {
  'use strict';
  /**
  * @ngdoc object
  * @name core.appload.constants
  * @requires <%=ngModulName %>
  * @requires core
  * @requires core.appload
  * @description
  * <h1>Core Appload Constants</h1>
  * <p>Define the constants to be used in the Core Appload module.</p>
  */
  angular
    .module('<%=ngModulName %>.core.appload')
    .constant('APPLOADCONSTANTS', {
      ROUTE: {
        STATE: 'appload',
        URL: '/appload',
        TEMPLATEURL: 'core/appload/appload.html',
        CONTROLLER: 'ApploadCtrl',
        CONTROLLERAS: 'appload'
      },
    });
})();
