(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.layout')
    .controller('LayoutCtrl', LayoutCtrl);

  LayoutCtrl.$inject = ['$window', '$state'];

  function LayoutCtrl($window, $state) {
    var layout = this;

    console.log( 'LayoutCtrl' );

    activate();

    function activate() {

      console.log('activate');


      return layout;
    }


   layout.logout = function () {
     $state.go('login');
   };
  }


})();
