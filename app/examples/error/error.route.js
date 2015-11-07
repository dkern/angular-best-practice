(function() {
    "use strict";
    angular.module("practice.error")
           .config(route);

    route.$inject = ["$stateProvider", "$urlRouterProvider"];

    function route($stateProvider, $urlRouterProvider) {
        $stateProvider.state("error", {
            url: "/error",
            templateUrl: "examples/error/error.tpl.html"
        });

        // route every unknown request to error page
        $urlRouterProvider.otherwise("/error");
    }
}());
