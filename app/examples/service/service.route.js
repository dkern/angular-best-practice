(function() {
    "use strict";
    angular.module("practice.service")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("service", {
            url: "/service",
            templateUrl: "examples/service/service.tpl.html",
            controller: "practice.serviceController as controller"
        });
    }
}());
