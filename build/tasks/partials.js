"use strict";

var gulp       = require("gulp");
var rev        = require("gulp-rev");
var tap        = require("gulp-tap");
var concat     = require("gulp-concat");
var ngHtml2js  = require("gulp-ng-html2js");
var htmlhint   = require("gulp-htmlhint");
var htmlmin    = require("gulp-htmlmin");
var uglify     = require("gulp-uglify");
var paths      = require("../config/paths");
var pipes      = require("../config/pipes");
var partials   = require("../config/partials");
var build      = require("../config/build");

// moves html source files into "paths.distDev" development environment
pipes.builtPartialsDev = function() {
    return pipes.validatedPartials()
                .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
                .pipe(gulp.dest(paths.distDev));
};

// converts partials to javascript and put them to angular's $templateCache using html2js and store them into "paths.distDev + '/templates'" development environment
pipes.scriptedPartialsDev = function() {
    return pipes.validatedPartials()
                .pipe(htmlhint.failReporter())
                .pipe(partials.compilePartialsInDev ? htmlmin({collapseWhitespace: true, removeComments: true}) : pipes.noop())
                .pipe(partials.compilePartialsInDev ? ngHtml2js({moduleName: partials.partialsModuleName}) : pipes.noop())
                .pipe(build.addTimestampToDevelopmentFiles ? rev() : pipes.noop())
                .pipe(gulp.dest(paths.distDev + (partials.compilePartialsInDev ? "/templates" : "")));
};

// converts partials to javascript and put them to angular's $templateCache using html2js and store them into "path.distProd" productive environment
pipes.scriptedPartialsProd = function() {
    return pipes.validatedPartials()
                .pipe(htmlhint.failReporter())
                .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
                .pipe(partials.compilePartialsInProd ? ngHtml2js({
                    moduleName: partials.partialsModuleName,
                    declareModule: false,
                    template: "$templateCache.put('<%= template.url %>','<%= template.escapedContent %>');"
                }) : pipes.noop())
                .pipe(partials.compilePartialsInProd ? concat("templates.min.js") : pipes.noop())
                .pipe(partials.compilePartialsInProd ? tap(function(file) {file.contents = Buffer.concat([
                    new Buffer("(function(module){" +
                               "try{module=angular.module('" + partials.partialsModuleName + "');}" + 
                               "catch(e){module=angular.module('" + partials.partialsModuleName + "', []);}" + 
                               "module.run(['$templateCache',function($templateCache){"),
                    file.contents,
                    new Buffer("}]);})();")]);
                }) : pipes.noop())
                .pipe(partials.compilePartialsInProd ? uglify() : pipes.noop())
                .pipe(partials.compilePartialsInProd && build.addTimestampToProductiveFiles ? rev() : pipes.noop())
                .pipe(gulp.dest(partials.compilePartialsInProd ? paths.distScriptsProd : paths.distProd));
};

// moves html source files into the dev environment
gulp.task("build-partials-dev", pipes.builtPartialsDev);

// converts partials to javascript using html2js
gulp.task("convert-partials-to-js", pipes.scriptedPartialsDev);
