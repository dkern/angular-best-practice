(function() {
    'use strict';
    angular.module("practice.directives")
           .directive("controllerDirective", controllerDirective);

    function controllerDirective() {
        return {
            templateUrl: "examples/directives/directives.controller.directive.tpl.html",
            restrict: "E",
            controller: controller,
            controllerAs: "controller",
            bindToController: true,
            scope: {
                // one-way-binding
                format: "@",

                // two-way-binding
                exchange: "="
            }
        };

        function controller() {
            var self = this;

            self.date = new Date();
            self.exchange = "some exchanged information";
        }
    }
}());
