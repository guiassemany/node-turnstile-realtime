(function() {
    'use strict';

    angular.module('nodeTurnstileRealtime')
        .config(routesConfig);

    function routesConfig($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");
        //
        // Now set up the states
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    "content": {
                        template: "-- Carregando --"
                    }
                }
            })
            .state('app.home', {
                url: "/home",
                views: {
                    "content@": {
                        templateUrl: "home/home.html",
                        controller: "HomeController",
                        controllerAs: "home"
                    }
                }
            });
    }

}());
