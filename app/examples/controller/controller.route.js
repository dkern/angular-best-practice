(function() {
    "use strict";
    angular.module("practice.controller")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("controller", {
            url: "/controller",
            templateProvider: getTemplate,
            controller: "practice.controllerController as controller"
        });

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/controller/controller.tpl.html");
        }
    }
}());
