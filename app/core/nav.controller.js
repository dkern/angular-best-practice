(function() {
    'use strict';
    angular.module("practice.core")
        .controller("practice.navController", navController);

    navController.$inject = ["$element"];

    function navController($element) {
        var self = this;

        self.items = $element.find("li");
        self.setActive = setActive;
        self.resetActive = resetActive;

        /**
         * remove active state from menu items
         * @param {object} $event
         * @returns void
         */
        function setActive($event) {
            self.resetActive();
            angular.element($event.currentTarget).parent().addClass("active");
        }

        /**
         * remove active state from menu items
         * @returns void
         */
        function resetActive() {
            self.items.removeClass("active");
        }
    }
}());
