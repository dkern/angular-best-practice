(function() {
    "use strict";
    angular.module("practice.error")
           .config(route);

    route.$inject = ["$stateProvider", "$urlRouterProvider"];

    function route($stateProvider, $urlRouterProvider) {
        $stateProvider.state("error", {
            url: "/error",
            templateProvider: getTemplate
        });

        // route every unknown request to error page
        $urlRouterProvider.otherwise("/error");

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/error/error.tpl.html");
        }
    }
}());
