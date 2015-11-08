(function() {
    "use strict";
    angular.module("practice.view")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("view", {
            url: "/view",
            templateProvider: getTemplate
        });

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/view/view.tpl.html");
        }
    }
}());
