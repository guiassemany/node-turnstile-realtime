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
        activate();

        function activate() {
          CatracaSocket.emit('conectado', 'Instancia do Módulo de tempo real conectada');
          CatracaSocket.on('nova-movimentacao', function(data){
            vm.movimentacoes.push(data.infoAcesso);
          });
        }

    }
})();
