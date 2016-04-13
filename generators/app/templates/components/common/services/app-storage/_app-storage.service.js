(function () {
    'use strict';

    angular
        .module('common.appstorage')
        .factory('appstorage', appstorage);

    appstorage.$inject = ['$q', '$window', 'KEYCHAINCONSTANTS'];

    function appstorage($q, $window, KEYCHAINCONSTANTS) {
        // Services
        var service = {
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem
        };
        return service;
        /**
         * @ngdoc function
         * @name setItem
         * @description
         * Store an Item in the platform storage
         */
        function setItem(key, value, platform) {
            var defer = $q.defer();

            switch(platform) {
                case "iOS":
                    var kc = new Keychain();
                    kc.setForKey(defer.resolve, defer.reject, key, KEYCHAINCONSTANTS.SERVICENAME, JSON.stringify(value));
                    console.log('set:', JSON.stringify(value));
                    break;
                default:
                    localStorage.setItem(key, value);
                    defer.resolve();
            }
            return defer.promise;
        }

        /**
         * @ngdoc function
         * @name getItem
         * @description
         * Retrieve an item from the platform storage
         *
         */
        function getItem(key, platform) {
            var defer = $q.defer();

            switch (platform) {
                case "iOS":
                    console.log('Get item from KEYCHAIN');

                    var kc = new Keychain();
                    kc.getForKey(function(value) {
                        defer.resolve(JSON.parse(value));
                    }, defer.reject, key, KEYCHAINCONSTANTS.SERVICENAME);

                    break;
                default:
                    defer.resolve(localStorage.getItem(key));
            }
            return defer.promise;
        }

        /**
         * @ngdoc function
         * @name removeItem
         * @description
         * Remove an item from the platform storage
         *
         */
        function removeItem(key, platform) {
            var defer = $q.defer();
            switch (platform) {
                case "iOS":
                    var kc = new Keychain();
                    kc.removeForKey(defer.resolve, defer.reject, key, KEYCHAINCONSTANTS.SERVICENAME);
                    break;
                default:
                    localStorage.removeItem(key);
                    defer.resolve();
            }
            return defer.promise;
        }
    }
})();
