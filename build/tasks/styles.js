"use strict";

var gulp       = require("gulp");
var rev        = require("gulp-rev");
var less       = require("gulp-less");
var concat     = require("gulp-concat");
var rename     = require("gulp-rename");
var minifyCss  = require("gulp-minify-css");
var sourcemaps = require("gulp-sourcemaps");
var es         = require("event-stream");
var bowerFiles = require("main-bower-files");
var pipes      = require("./pipes");
var paths      = require("../config/paths");
var build      = require("../config/build");
var regex      = require("../config/regex");
var additional = require("../config/additional");

// moves css to "paths.distDev" development environment
pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
               .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
               .pipe(gulp.dest(paths.distDev));
};

// compile vendor less files
pipes.buildVendorStylesLess = function() {
    return gulp.src(bowerFiles({
                        filter: function(e) {
                            return regex.less.test(e);
                        }
                    }))
                    .pipe(less({}));
};

// get vendor css files
pipes.builtVendorCssStyles = function() {
    return gulp.src(bowerFiles({
                        filter: function(e) { 
                            return regex.css.test(e); 
                        }
                    }));
};

// get additional vendor css files
pipes.builtAdditionalVendorCssStyles = function() {
    return gulp.src(additional.css);
};

// compile and move vendor css files into "path.distDev" development environment
pipes.builtVendorStylesDev = function() {
    return es.merge(pipes.buildVendorStylesLess(), pipes.builtVendorCssStyles(), pipes.builtAdditionalVendorCssStyles())
             .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
             .pipe(gulp.dest(paths.distDev + "/styles"));
};

// compile, minifies, concatenates and move vendor css files into "path.distProd" productive environment
pipes.builtVendorStylesProd = function() {
    return es.merge(pipes.buildVendorStylesLess(), pipes.builtVendorCssStyles(), pipes.builtAdditionalVendorCssStyles())
             .pipe(pipes.orderedVendorStyles())
             .pipe(concat(build.vendorMinCssFile))
             .pipe(minifyCss())
             .pipe(build.addTimestampToProductiveFiles ? rev() : pipes.noop())
             .pipe(gulp.dest(paths.distProd + "/styles"));
};

// minifies app css and moves to "path.distProd" productive environment
pipes.builtStylesProd = function() {
    return gulp.src(paths.styles)
               .pipe(build.includeSourceMaps ? sourcemaps.init() : pipes.noop())
               .pipe(minifyCss())
               .pipe(build.includeSourceMaps ? sourcemaps.write() : pipes.noop())
               .pipe(rename(function(path) {
                   path.extname = ".min" + path.extname;
               }))
               .pipe(build.addTimestampToProductiveFiles ? rev() : pipes.noop())
               .pipe(gulp.dest(paths.distProd));
};

// moves css to the dev environment
gulp.task("build-styles-dev", pipes.builtStylesDev);

// minifies css and moves to the prod environment
gulp.task("build-styles-prod", pipes.builtStylesProd);