"use strict";

var gulp  = require("gulp");
var del   = require("del");
var Q     = require("q");
var paths = require("../config/paths");

// removes all compiled development files
gulp.task("clean-dev", function() {
    var deferred = Q.defer();

    del(paths.distDev, function() {
        deferred.resolve();
    });

    return deferred.promise;
});

// removes all compiled production files
gulp.task("clean-prod", function() {
    var deferred = Q.defer();

    del(paths.distProd, function() {
        deferred.resolve();
    });

    return deferred.promise;
});
