(function() {
  'use strict';

  angular
    .module('nodeTurnstileRealtime')
    .service('CatracaService', CatracaService);

  CatracaService.$inject = ['$http', 'AppConfig', '$filter'];

  /* @ngInject */
  function CatracaService($http, AppConfig, $filter) {


  }
})();
