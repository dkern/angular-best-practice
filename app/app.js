(function() {
    'use strict';
    angular.module("practice", [
        // app partials - configured in gulpfile.js
        "practice.partials",
        // app home
        "practice.home",
        // examples
        "practice.controller",
        "practice.directives",
        "practice.error",
        "practice.filter",
        "practice.promise",
        "practice.service",
        "practice.view"
    ]);
}());
