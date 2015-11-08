(function() {
    "use strict";
    angular.module("practice.home")
           .config(route);

    route.$inject = ["$stateProvider", "$urlRouterProvider"];

    function route($stateProvider, $urlRouterProvider) {
        $stateProvider.state("home", {
            url: "/",
            templateProvider: getTemplate
        });

        // route empty request to home page
        $urlRouterProvider.when("", "/");

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("home/home.tpl.html");
        }
    }
}());
