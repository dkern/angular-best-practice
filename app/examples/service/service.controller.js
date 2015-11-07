(function() {
    'use strict';
    angular.module("practice.service")
           .controller("practice.serviceController", serviceController);

    serviceController.$inject = ["practiceService"];

    function serviceController(practiceService) {
        var self = this;

        self.service = practiceService;
        self.message = "used practiceService.verboseMessage(message) ...";
    }
}());
