"use strict";

var gulp     = require("gulp");
var jshint   = require("gulp-jshint");
var htmlhint = require("gulp-htmlhint");
var pipes    = require("./pipes");
var paths    = require("../config/paths");
var server   = require("../config/server");

// validate "path.scripts" with jshint
pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)
               .pipe(jshint())
               .pipe(jshint.reporter("jshint-stylish"));
};

// runs jshint on the "server.script" development server scripts
pipes.validatedServerScripts = function() {
    return gulp.src(server.scripts)
               .pipe(jshint())
               .pipe(jshint.reporter("jshint-stylish"));
};

// checks html source files "paths.partials" for syntax errors
pipes.validatedPartials = function() {
    return gulp.src(paths.partials)
               .pipe(htmlhint({"doctype-first": false}))
               .pipe(htmlhint.reporter());
};

// checks index.html for syntax errors
pipes.validatedIndex = function() {
    return gulp.src(paths.index)
               .pipe(htmlhint())
               .pipe(htmlhint.reporter());
};

// validate "path.scripts" with jshint
gulp.task("validate-app-scripts", pipes.validatedAppScripts);

// runs jshint on the "server.scripts" development server scripts
gulp.task("validate-server-scripts", pipes.validatedServerScripts);

// checks html source files "paths.partials" for syntax errors
gulp.task("validate-partials", pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task("validate-index", pipes.validatedIndex);
