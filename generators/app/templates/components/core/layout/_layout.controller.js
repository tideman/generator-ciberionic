/* global angular */
(function() {
  'use strict';
  /**
  * @ngdoc controller
  * @name core.layout.controller
  * @requires <%=ngModulName %>
  * @requires core
  * @requires core.layout
  * @description
  * <h1>Core Layout Controller</h1>
  * <p>The Core Layout Controller allows you to control the functionalities for the page where the Parent Nav view exists.</p>
  * <p>Comes in handy when f.e. you would like to, for example, include a sidemenu</p>
  */
  angular
    .module('<%=ngModulName %>.core.layout')
    .controller('LayoutCtrl', LayoutCtrl);

  LayoutCtrl.$inject = [];

  function LayoutCtrl() {
    var layout = this;

    activate();

    function activate() {
      return layout;
    }
  }
})();
