(function() {
    "use strict";
    angular.module("practice.home")
           .config(route);

    route.$inject = ["$stateProvider", "$urlRouterProvider"];

    function route($stateProvider, $urlRouterProvider) {
        $stateProvider.state("home", {
            url: "/",
            templateUrl: "home/home.tpl.html"
        });

        // route empty request to home page
        $urlRouterProvider.when("", "/");
    }
}());
