(function() {
    "use strict";
    angular.module("practice.filter")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("filter", {
            url: "/filter",
            templateUrl: "examples/filter/filter.tpl.html",
            controller: "practice.filterController as controller"
        });
    }
}());
