(function() {
    'use strict';
    angular.module("practice.directives")
           .directive("simpleDirective", simpleDirective);

    function simpleDirective() {
        return {
            templateUrl: "examples/directives/directives.simple.directive.tpl.html",
            restrict: "E"
        };
    }
}());
