(function() {
    'use strict';
    angular.module("practice", [
        // make every module this app uses available here

        // partials module - configured and generated in gulpfile.js
        "practice.partials",

        // home screen module
        "practice.home",

        // example modules
        "practice.controller",
        "practice.directives",
        "practice.error",
        "practice.filter",
        "practice.promise",
        "practice.service",
        "practice.view"
    ]);
}());
