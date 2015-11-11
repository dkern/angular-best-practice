"use strict";

var gulp    = require("gulp");
var inject  = require("gulp-inject");
var htmlmin = require("gulp-htmlmin");
var paths   = require("../config/paths");
var pipes   = require("../config/pipes");

// validates and injects sources into index.html and moves it to "paths.distDev" development environment
pipes.builtIndexDev = function() {
    var orderedVendorScripts = pipes.builtVendorScriptsDev().pipe(pipes.orderedVendorScripts()),
        additionalVendorScripts = pipes.builtAdditionalVendorScriptsDev(),
        orderedAppScripts = pipes.builtAppScriptsDev().pipe(pipes.orderedAppScripts()),
        scriptedPartialsDev = pipes.scriptedPartialsDev(),
        appStyles = pipes.builtStylesDev(),
        orderedVendorStyles = pipes.builtVendorStylesDev().pipe(pipes.orderedVendorStyles());

    return pipes.validatedIndex()
                .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
                .pipe(inject(orderedVendorScripts, {relative: true, name: "vendor"}))
                .pipe(inject(additionalVendorScripts, {relative: true, name: "vendor"}))
                .pipe(inject(scriptedPartialsDev, {relative: true, name: "templates"}))
                .pipe(inject(orderedAppScripts, {relative: true}))
                .pipe(inject(appStyles, {relative: true}))
                .pipe(inject(orderedVendorStyles, {relative: true, name: "vendor"}))
                .pipe(gulp.dest(paths.distDev));
};

// validates and injects sources into index.html, minifies and moves it to "path.distProd" productive environment
pipes.builtIndexProd = function() {
    var vendorScripts = pipes.builtVendorScriptsProd(),
        additionalVendorScripts = pipes.builtAdditionalVendorScriptsProd(),
        scriptedPartialsProd = pipes.scriptedPartialsProd(),
        appScripts = pipes.builtAppScriptsProd(),
        appStyles = pipes.builtStylesProd(),
        orderedVendorStyles = pipes.builtVendorStylesProd().pipe(pipes.orderedVendorStyles());

    return pipes.validatedIndex()
                .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
                .pipe(inject(vendorScripts, {relative: true, name: "vendor"}))
                .pipe(inject(additionalVendorScripts, {relative: true, name: "vendor"}))
                .pipe(inject(scriptedPartialsProd, {relative: true, name: "templates"}))
                .pipe(inject(appScripts, {relative: true}))
                .pipe(inject(appStyles, {relative: true}))
                .pipe(inject(orderedVendorStyles, {relative: true, name: "vendor"}))
                .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
                .pipe(gulp.dest(paths.distProd));
};

// validates and injects sources into index.html and moves it to "paths.distDev" development environment
gulp.task("build-index-dev", pipes.builtIndexDev);

// validates and injects sources into index.html, minifies and moves it to "path.distProd" productive environment
gulp.task("build-index-prod", pipes.builtIndexProd);
