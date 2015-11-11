"use strict";

var gulp       = require("gulp");
var rev        = require("gulp-rev");
var concat     = require("gulp-concat");
var uglify     = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var es         = require("event-stream");
var bowerFiles = require("main-bower-files");
var paths      = require("../config/paths");
var pipes      = require("../config/pipes");
var build      = require("../config/build");
var regex      = require("../config/regex");
var additional = require("../config/additional");

// validate and move "path.scripts" to "path.distDev" development environment
pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
                .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
                .pipe(gulp.dest(paths.distDev));
};

// concatenates, uglifies and moves app scripts and partials to "path.distProd" productive environment
pipes.builtAppScriptsProd = function() {
    var scriptedPartials = pipes.scriptedPartialsProd();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
             .pipe(pipes.orderedAppScripts())
             .pipe(build.includeSourceMaps ? sourcemaps.init() : pipes.noop())
             .pipe(concat(build.appMinFile))
             .pipe(uglify())
             .pipe(build.includeSourceMaps ? sourcemaps.write() : pipes.noop())
             .pipe(build.addTimestampToProductiveFiles ? rev() : pipes.noop())
             .pipe(gulp.dest(paths.distScriptsProd));
};

// moves vendor scripts to "path.distDev" development environment
pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles({
                   filter: function(e) { return regex.js.test(e); }
                }))
               .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
               .pipe(gulp.dest(paths.distDev + "/bower_components"));
};

// moves additional vendor scripts to "path.distDev" development environment
pipes.builtAdditionalVendorScriptsDev = function() {
    return gulp.src(additional.js)
               .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
               .pipe(gulp.dest(paths.distDev + "/bower_components"));
};

// concatenates, uglifies, and moves vendor scripts to "path.distProd" productive environment
pipes.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles({
                    filter: function(e) { return regex.js.test(e); }
                }))
               .pipe(pipes.orderedVendorScripts())
               .pipe(concat(build.vendorMinScriptFile))
               .pipe(uglify())
               .pipe(build.addTimestampToProductiveFiles ? rev() : pipes.noop())
               .pipe(gulp.dest(paths.distScriptsProd));
};

// concatenates, uglifies, and moves additional vendor scripts to "path.distProd" productive environment
pipes.builtAdditionalVendorScriptsProd = function() {
    return gulp.src(additional.js)
               .pipe(pipes.orderedVendorScripts())
               .pipe(concat(build.vendorMinScriptFile))
               .pipe(uglify())
               .pipe(build.addTimestampToProductiveFiles ? rev() : pipes.noop())
               .pipe(gulp.dest(paths.distScriptsProd));
};

// moves app scripts into the dev environment
gulp.task("build-app-scripts-dev", pipes.builtAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task("build-app-scripts-prod", pipes.builtAppScriptsProd);

// moves vendor scripts into the dev environment
gulp.task("build-vendor-scripts-dev", pipes.builtVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task("build-vendor-scripts-prod", pipes.builtVendorScriptsProd);
