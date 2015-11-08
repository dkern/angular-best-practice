(function() {
    "use strict";
    angular.module("practice.filter")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("filter", {
            url: "/filter",
            templateProvider: getTemplate,
            controller: "practice.filterController as controller"
        });
        
        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/filter/filter.tpl.html");
        }
    }
}());
