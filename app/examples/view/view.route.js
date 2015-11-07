(function() {
    "use strict";
    angular.module("practice.view")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("view", {
            url: "/view",
            templateUrl: "examples/view/view.tpl.html"
        });
    }
}());
