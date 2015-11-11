"use strict";

var gulp  = require("gulp");
var es    = require("event-stream");
var paths = require("../config/paths");
var pipes = require("../config/pipes");

// builds a complete development environment
pipes.builtAppDev = function() {
    return es.merge(pipes.builtIndexDev(), pipes.processedFonts(paths.distDev), pipes.processedVendorFonts(paths.distDev), pipes.processedImagesDev());
};

// builds a complete productive environment
pipes.builtAppProd = function() {
    return es.merge(pipes.builtIndexProd(), pipes.processedFonts(paths.distProd), pipes.processedVendorFonts(paths.distProd), pipes.processedImagesProd());
};

// builds a complete dev environment
gulp.task("build-app-dev", pipes.builtAppDev);

// cleans and builds a complete dev environment
gulp.task("clean-build-app-dev", ["clean-dev"], pipes.builtAppDev);

// builds a complete prod environment
gulp.task("build-app-prod", pipes.builtAppProd);

// cleans and builds a complete prod environment
gulp.task("clean-build-app-prod", ["clean-prod"], pipes.builtAppProd);
