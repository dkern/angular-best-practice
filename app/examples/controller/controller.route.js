(function() {
    "use strict";
    angular.module("practice.controller")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("controller", {
            url: "/controller",
            templateUrl: "examples/controller/controller.tpl.html",
            controller: "practice.controllerController as controller"
        });
    }
}());
