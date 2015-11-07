(function() {
    'use strict';
    angular.module("practice.controller")
           .controller("practice.controllerController", controllerController);

    function controllerController() {
        var self = this;

        self.headline = "View-Controller Example";
        self.location = "app/examples/controller/";
        self.files = [
            {name: "controller.module.js", description: "module creation"},
            {name: "controller.route.js", description: "module routing"},
            {name: "controller.controller.js", description: "view controller"},
            {name: "controller.tpl.html", description: "content template"}
        ];
        self.action = action;

        /**
         * alert and log a simple message for demonstration
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
