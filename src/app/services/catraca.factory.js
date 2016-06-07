(function() {
  'use strict';

  angular
    .module('nodeTurnstileRealtime')
    .service('CatracaSocket', CatracaSocket);

  CatracaSocket.$inject = ['socketFactory'];

  /* @ngInject */
  function CatracaSocket(socketFactory) {
    var myIoSocket = io.connect('http://10.5.69.10:5005');

    CatracaSocket = socketFactory({
      ioSocket: myIoSocket
    });

    return CatracaSocket;
  }
})();
