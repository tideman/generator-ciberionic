(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.layout')
    .controller('LayoutCtrl', LayoutCtrl);

  LayoutCtrl.$inject = ['UserModel', 'appstorage', '$window', '$state', 'LOGINCONFIG'];

  function LayoutCtrl(UserModel, appstorage, $window, $state, LOGINCONFIG) {
    var layout = this;

    console.log( 'LayoutCtrl' );

    activate();

    function activate() {

      layout.user = {};
      layout.user.avatar = UserModel.currentUser().avatar;
      layout.user.name = UserModel.currentUser().name;

      return layout;

    }


   layout.logout = function () {
     //throw away remmber me
     //throw away crdentials if set.
     appstorage.removeItem(LOGINCONFIG.ADFS, $window.device.platform);
     appstorage.removeItem(LOGINCONFIG.ACS, $window.device.platform);
     //appstorage.removeItem(LOGINCONFIG.PASSWORD, $window.device.platform);
     //appstorage.removeItem(LOGINCONFIG.USERNAME, $window.device.platform);
     //appstorage.removeItem(LOGINCONFIG.REMEMBERMEKEY, $window.device.platform);
     $state.go('login');
   }
  }


})();
