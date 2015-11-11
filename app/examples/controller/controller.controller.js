(function() {
    'use strict';
    angular.module("practice.controller")
           .controller("practice.controllerController", controllerController);

    // always use $inject to make functions minify-able
    // @see https://docs.angularjs.org/guide/di
    controllerController.$inject = ["$location"];

    function controllerController($location) {
        var self = this;

        // define public variables for own scope
        self.headline = "View-Controller Example";
        self.location = "app/examples" + $location.path() + "/";
        self.files = [
            {name: "controller.module.js", description: "module creation"},
            {name: "controller.route.js", description: "module routing"},
            {name: "controller.controller.js", description: "view controller"},
            {name: "controller.tpl.html", description: "content template"}
        ];
        self.action = action;

        // function definitions below

        /**
         * alert and log a simple message for demonstration
         * @param {string} nameInput
         * @returns void
         */
        function action(nameInput) {
            var name = nameInput ? nameInput : "Angular",
                message = "Congratulation " + name + ", you clicked the button!";

            console.log(message);
            alert(message);
        }
    }
}());
