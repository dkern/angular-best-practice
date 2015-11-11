(function() {
    'use strict';
    angular.module("practice.filter")
           .controller("practice.filterController", filterController);

    function filterController() {
        var self = this;

        // define public variables for own scope
        self.entries = [
            {id: 1, name: "One little duck"},
            {id: 5, name: "Five little ducks"},
            {id: 3, name: "Three little ducks"},
            {id: 8, name: "Eight little ducks"},
            {id: 6, name: "Six little ducks"},
            {id: 2, name: "Two little ducks"},
            {id: 9, name: "Nine little ducks"},
            {id: 4, name: "Four little ducks"},
            {id: 7, name: "Seven little ducks"}
        ];
    }
}());
