(function() {
    'use strict';
    angular.module("practice.filter")
           .filter("startsWith", startsWith);

    function startsWith() {
        return function(list, expression) {
            return list.filter(function(entry) {
                if( !expression ) {
                    return true;
                }

                return entry.name.toLowerCase().substr(0, expression.length) === expression.toLowerCase();
            });
        };
    }
}());
