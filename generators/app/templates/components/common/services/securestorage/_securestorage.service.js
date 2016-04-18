/* global angular*/
/* global Keychain */
/* global localStorage*/
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
    .module('service.securestorage')
    .factory('securestorage', securestorage);

  securestorage.$inject = ['$q', '$window', 'APPSTORAGECONSTANTS'];

  function securestorage($q, $window, APPSTORAGECONSTANTS) {
    // Global Variables
    var defer;
    var kc;

    // Services
    var service = {
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem
    };
    return service;

    function setItem(key, value, platform) {
      console.log('KC Store: ', value);
      // Set the defer
      defer = $q.defer();
      // Switch platforms
      switch (platform) {
        case "iOS":
        case "Android":
          // Set the kc
          kc = new Keychain();
          // Set the kc value by key
          kc.setForKey(defer.resolve(), defer.reject(), key, APPSTORAGECONSTANTS.GENERAL.SERVICENAME, value);
          break;
        default:
          defer.resolve(localStorage.setItem(key, value));
      }
      return defer.promise;
    }

    function getItem(key, platform) {
      // Set the defer
      defer = $q.defer();
      // Switch platforms
      switch (platform) {
        case "iOS":
        case "Android":
          // Set the kc
          kc = new Keychain();
          var error = "Key not found";
          // Get the kc value by key
          kc.getForKey(
            function (value) {
              // Resolve the promise
              defer.resolve(value);
            },
            // Reject the promise
            defer.reject(error), key, APPSTORAGECONSTANTS.GENERAL.SERVICENAME);
          break;
        default:
          // Check if the Key exists
          if (localStorage.getItem(key)) {
            // Resolve the promise and the value
            defer.resolve(localStorage.getItem(key));
          } else {
            // Key does not exists, Reject the promise
            defer.reject('Value for ' + key + ' not found in localStorage');
          }
      }
      // Return the promise
      return defer.promise;
    }

    function removeItem(key, platform) {
      // Set the defer
      defer = $q.defer();
      // Switch platforms
      switch (platform) {
        case "iOS":
        case "Android":
          // Set the kc
          kc = new Keychain();
          // Remove the kc value by key
          kc.removeForKey(defer.resolve, defer.reject, key, APPSTORAGECONSTANTS.GENERAL.SERVICENAME);
          break;
        default:
          // Check if the Key exists
          if (localStorage.getItem(key)) {
            // Remove from localStorage & Resolve the promise
            defer.resolve(localStorage.removeItem(key));
          } else {
            // Key does not exists, Reject the promise
            defer.reject('Remove from LS: Value for ' + key + ' not found in localStorage');
          }
      }
      // Return the promise
      return defer.promise;
    }
  }
})();
