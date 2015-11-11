"use strict";

var gulp    = require("gulp");
var pipes   = require("./pipes");
var paths   = require("../config/paths");

// moves image to "paths.distDev + '/images'" development environment
pipes.processedImagesDev = function() {
    return gulp.src(paths.images)
               .pipe(gulp.dest(paths.distDev + "/images"));
};

// moves image to "paths.distProd + '/images'" productive environment
pipes.processedImagesProd = function() {
    return gulp.src(paths.images)
               .pipe(gulp.dest(paths.distProd + "/images"));
};
