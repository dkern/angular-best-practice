(function() {
    "use strict";
    angular.module("practice.service")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("service", {
            url: "/service",
            templateProvider: getTemplate,
            controller: "practice.serviceController as controller"
        });

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/service/service.tpl.html");
        }
    }
}());
