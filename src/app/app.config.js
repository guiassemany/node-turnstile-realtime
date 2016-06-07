(function() {
    'use strict';

    angular
        .module('nodeTurnstileRealtime')
        .controller(Config);

    Config.$inject = ['$httpProvider'];

    function Config($httpProvider, socketFactoryProvider) {
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
      //socketFactoryProvider.ioSocket(io.connect('http://10.5.69.10:5005'));
    }
})();
