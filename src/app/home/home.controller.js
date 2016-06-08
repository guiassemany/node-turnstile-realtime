(function() {
    'use strict';

    angular
        .module('nodeTurnstileRealtime')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['CatracaService', 'CatracaSocket'];

    /* @ngInject */
    function HomeController(CatracaService, CatracaSocket) {
        var vm = this;
        vm.movimentacoes = [];
        vm.catraca1 = {
          ip: "10.5.71.231",
          online: false
        };
        vm.catraca2 = {
          ip: "10.5.71.232",
          online: false
        };
        vm.catraca3 = {
          ip: "10.5.71.233",
          online: false
        };
        vm.catraca4 = {
          ip: "10.5.71.234",
          online: false
        };


        activate();

        function activate() {
          CatracaSocket.emit('conectado', 'Instancia do Módulo de tempo real conectada');
          CatracaSocket.on('nova-movimentacao', function(data){
            vm.movimentacoes.unshift(data.infoAcesso);
            if(vm.movimentacoes.length > 10) {
              vm.movimentacoes.pop();
            }
          });
          CatracaSocket.on('catracas-online', function(data){
            if(data.indexOf(vm.catraca1.ip) > -1){
              vm.catraca1.online = true;
            }
            if(data.indexOf(vm.catraca2.ip) > -1){
              vm.catraca2.online = true;
            }
            if(data.indexOf(vm.catraca3.ip) > -1){
              vm.catraca3.online = true;
            }
            if(data.indexOf(vm.catraca4.ip) > -1){
              vm.catraca4.online = true;
            }
          });
        }

    }
})();
