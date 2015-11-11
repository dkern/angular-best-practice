(function() {
    'use strict';
    angular.module("practice.core")
           .controller("practice.core.navController", navController);

    // always use $inject to make functions minify-able
    // @see https://docs.angularjs.org/guide/di
    navController.$inject = ["$element"];

    function navController($element) {
        var self = this;

        // define public variables for own scope
        self.items = $element.find("li");
        self.setActive = setActive;
        self.resetActive = resetActive;

        // function definitions below

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
