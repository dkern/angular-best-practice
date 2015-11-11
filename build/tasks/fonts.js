"use strict";

var gulp       = require("gulp");
var rename     = require("gulp-rename");
var es         = require("event-stream");
var bowerFiles = require("main-bower-files");
var paths      = require("../config/paths");
var pipes      = require("../config/pipes");
var regex      = require("../config/regex");
var additional = require("../config/additional");

// moves font files to given environment
pipes.processedFonts = function(basePath) {
    return gulp.src(paths.fonts)
               .pipe(gulp.dest(basePath));
};

// moves vendor font files to given environment
pipes.processedVendorFonts = function(basePath) {
    var vendorFontFiles = gulp.src(bowerFiles({
                                       filter: function(e) { return regex.fonts.test(e); }
                                   }),
                                   {base: "bower_components"}),
        additionalFontFiles = gulp.src(additional.fonts);

    return es.merge(vendorFontFiles, additionalFontFiles)
             .pipe(rename(function(path) {
                 var newPath,
                 arrayPath = path.dirname.split("/");

                 if( arrayPath.length > 1 ) {
                     arrayPath.splice(0, 1);
                     newPath = "../" + arrayPath.join("/");
                 } else {
                     newPath = "./";
                 }

                 path.dirname = newPath;
             }))
             .pipe(gulp.dest(basePath + "/fonts"));
};
