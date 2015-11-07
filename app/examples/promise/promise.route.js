(function() {
    "use strict";
    angular.module("practice.promise")
           .config(route);

    route.$inject = ["$stateProvider"];

    function route($stateProvider) {
        $stateProvider.state("promise", {
            url: "/promise",
            templateUrl: "examples/promise/promise.tpl.html",
            controller: "practice.promiseController as controller"
        });
    }
}());
