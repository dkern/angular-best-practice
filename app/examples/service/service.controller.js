(function() {
    'use strict';
    angular.module("practice.service")
           .controller("practice.serviceController", serviceController);

    // always use $inject to make functions minify-able
    // @see https://docs.angularjs.org/guide/di
    serviceController.$inject = ["practiceService"];

    function serviceController(practiceService) {
        var self = this;

        // define public variables for own scope
        self.service = practiceService;
        self.message = "used practiceService.verboseMessage(message) ...";
    }
}());
