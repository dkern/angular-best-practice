(function() {
    "use strict";
    angular.module("practice.directives")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("directives", {
            url: "/directives",
            templateUrl: "examples/directives/directives.tpl.html"
        });
    }
}());
