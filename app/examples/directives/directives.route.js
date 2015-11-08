(function() {
    "use strict";
    angular.module("practice.directives")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("directives", {
            url: "/directives",
            templateProvider: getTemplate
        });

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/directives/directives.tpl.html");
        }
    }
}());
