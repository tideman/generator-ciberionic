(function() {
  'use strict';

  angular
    .module('<%= ngModulName %>.core')
    .constant('CORECONSTANTS', {
      SOME_CONSTANT: 'VALUE HERE',
    });
})();
