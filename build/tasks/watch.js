"use strict";

var gulp       = require("gulp");
var nodemon    = require("gulp-nodemon");
var livereload = require("gulp-livereload");
var paths      = require("../config/paths");
var server     = require("../config/server");
var pipes      = require("../config/pipes");

// clean, build, and watch live changes to the development environment
gulp.task("watch-dev", ["clean-build-app-dev", "validate-server-scripts"], function() {
    // start nodemon to auto-reload the development server
    nodemon({
                script: server.folder + server.file, 
                ext: "js", 
                watch: [server.folder], 
                env: {
                    ENV: "development",
                    PORT: server.developmentPort
                }
            })
            .on("change", ["validate-server-scripts"])
            .on("restart", function () {
                console.log("[nodemon] restarted development server");
            });

    // start live-reload server
    livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexDev()
                    .pipe(livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
                    .pipe(livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.scriptedPartialsDev()
                    .pipe(livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesDev()
                    .pipe(livereload());
    });

    // watch fonts
    gulp.watch(paths.fonts, function() {
        return pipes.processedFonts(paths.distDev)
                    .pipe(livereload());
    });
});

// clean, build, and watch live changes to the production environment
gulp.task("watch-prod", ["clean-build-app-prod", "validate-server-scripts"], function() {
    // start nodemon to auto-reload the production server
    nodemon({
                script: server.folder + server.file, 
                ext: "js", 
                watch: [server.folder], 
                env: {
                    ENV: "productive",
                    PORT: server.productivePort
                }
            })
            .on("change", ["validate-server-scripts"])
            .on("restart", function () {
                console.log("[nodemon] restarted production server");
            });

    // start live-reload server
    livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexProd()
                    .pipe(livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
                    .pipe(livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.scriptedPartialsProd()
                    .pipe(livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesProd()
                    .pipe(livereload());
    });

    // watch fonts
    gulp.watch(paths.fonts, function() {
        return pipes.processedFonts(paths.distProd)
                    .pipe(livereload());
    });
});