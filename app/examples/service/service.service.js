(function() {
    'use strict';
    angular.module("practice.service")
           .service("practiceService", practiceService);

    function practiceService() {
        var self = this;

        // define public variables for this service
        self.publicFunction = publicFunction;
        self.verboseMessage = verboseMessage;

        // function definitions below

        /**
         * a public service function
         * @returns void
         */
        function publicFunction() {
            var message = "used practiceService.publicFunction ...";
            self.verboseMessage(message);
        }

        /**
         * verbose a message to console and alert
         * @param {string} message
         * @returns void
         */
        function verboseMessage(message) {
            console.log(message);
            alert(message);
        }
    }
}());
