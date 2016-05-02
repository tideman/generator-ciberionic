/* global angular */
(function () {
  'use strict';
  /**
  * @ngdoc object
  * @name appload.constant:APPLOADCONSTANTS
  * @requires <%=ngModulName %>
  * @description
  * <h1>Appload Constant</h1>
  * <p>Define the constants to be used in this module.</p>
  */
  angular
    .module('<%=ngModulName %>.appload')
    .constant('APPLOADCONSTANTS', {
      ROUTE: {
        STATE: 'appload',
        URL: '/appload',
        TEMPLATEURL: 'appload/appload.html',
        CONTROLLER: 'ApploadCtrl',
        CONTROLLERAS: 'appload'
      }
    });
})();
