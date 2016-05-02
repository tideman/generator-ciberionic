/* global angular*/
/* global Keychain */
/* global localStorage*/
(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name securestorage.service:securestorage
   * @description
   * @requires https://docs.angularjs.org/api/ng/service/$window
   * @requires https://www.npmjs.com/package/cordova-keychain
   * @requires securestorage.constant:APPSTORAGECONSTANTS
   * <h1>Secure Storage Services</h1>
   * <p>@TODO Describe Services</p>
   */
  angular
    .module('service.securestorage')
    .factory('securestorage', securestorage);

  securestorage.$inject = ['$q', '$window', 'APPSTORAGECONSTANTS'];

  function securestorage($q, $window, APPSTORAGECONSTANTS) {
    // Global Variables
    var defer, kc;

    // Services
    var service = {
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem,
      escapeObj : escapeObj
    };
    return service;

    /**
     * setItem
     */
    function setItem(key, value, platform) {
      defer = $q.defer();
      // Switch platforms
      switch (platform) {
        case 'iOS':
        case 'Android':
          // Set the kc
          kc = new Keychain();
          // Set the kc value by key
          kc.setForKey(
            function( success ){
              defer.resolve( success );
            }, function( error ){
              console.log( 'KC Set Error: ', error );
              defer.reject( error );
            }, key, APPSTORAGECONSTANTS.GENERAL.SERVICENAME, value);
          break;
        default:
          // Resolve the result
          defer.resolve( localStorage.setItem(key, value) );
      }
      // Return the promise
      return defer.promise;
    }

    /**
     * getItem
     */
    function getItem(key, platform) {
      defer = $q.defer();
      // Switch platforms
      switch (platform) {
        case 'iOS':
        case 'Android':
          // Set the kc
          kc = new Keychain();
          // Get the kc value by key
          kc.getForKey(
            function( success ){
              // Resolve the promise and the success
              defer.resolve( success );
            },
            function( error ){
              // Reject the promise and the error
              defer.reject( error );
            },
            key, APPSTORAGECONSTANTS.GENERAL.SERVICENAME
          );
          break;
        default:
          // Check if the Key exists
          if (localStorage.getItem(key)) {
            // Resolve the promise and the value
            defer.resolve( localStorage.getItem(key) );
          } else {
            // Key does not exists, Reject the promise
            defer.reject();
          }
        }
        // Return the promise
        return defer.promise;
    }
    /**
     * removeItem
     */
    function removeItem(key, platform) {
      defer = $q.defer();
      // Switch platforms
      switch (platform) {
        case 'iOS':
        case 'Android':
          // Set the kc
          kc = new Keychain();
          // Remove the kc value by key
          kc.removeForKey(
            function( success ){
              // Resolve the promise and the success
              defer.resolve( success );
            },
            function( error ){
              // Reject the promise and the error
              defer.reject( error );
            },
            key, APPSTORAGECONSTANTS.GENERAL.SERVICENAME);
          break;
        default:
          // Check if the Key exists
          if (localStorage.getItem(key)) {
            // Remove from localStorage & Resolve the promise
            defer.resolve( localStorage.removeItem(key) );
          } else {
            // Key does not exists, Reject the promise
            defer.reject();
          }
      }
      // Return the promise
      return defer.promise;
    }

    function escapeObj( obj ){
      var value = JSON.stringify(obj);
        value = value
        .replace(/[\\]/g, '\\\\')
        .replace(/[\"]/g, '\\\"')
        .replace(/[\/]/g, '\\/')
        .replace(/[\b]/g, '\\b')
        .replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t');
      return value;
    }
  }
})();
