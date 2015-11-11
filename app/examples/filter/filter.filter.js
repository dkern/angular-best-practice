(function() {
    'use strict';
    angular.module("practice.filter")
           .filter("startsWith", startsWith);

    function startsWith() {
        // a filter is always a function with two parameters 'input' and 'expression'
        // and will return the filtered input again, in this case an array list
        // @see https://docs.angularjs.org/api/ng/filter/filter
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
