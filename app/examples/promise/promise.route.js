(function() {
    "use strict";
    angular.module("practice.promise")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("promise", {
            url: "/promise",
            templateProvider: getTemplate,
            controller: "practice.promiseController as controller"
        });

        getTemplate.$inject = ["$templateCache"];

        function getTemplate($templateCache) {
            return $templateCache.get("examples/promise/promise.tpl.html");
        }
    }
}());
