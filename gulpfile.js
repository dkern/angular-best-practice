"use strict";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var gutil = require("gulp-util");
var del = require("del");
var es = require("event-stream");
var bowerFiles = require("main-bower-files");
var print = require("gulp-print");
var Q = require("q");



/*
** definitions
*/



// include source maps in production files
var includeSourceMaps = false;

// name of the generated partials module by "ngHtml2js"
var partialModuleName = "practice.partials";

// folder where the server file is stored
var serverFolder = "server/";

// name of the server script inside "serverFolder"
var serverFile = "server.js";

// define your file paths
var paths = {
    scripts: "app/**/*.js",
    styles: "./app/**/*.css",
    images: "./images/**/*",
    index: "./app/index.html",
    partials: ["app/**/*.html", "!app/index.html"],
    distDev: "./dist/development",
    distProd: "./dist/productive",
    distScriptsProd: "./dist/productive/scripts",
    scriptsDevServer: "server/**/*.js"
};

var jsScriptsRegex =  /.js$/i,
    cssStylesRegex = /.css$/i,
    lessStylesRegex = /.less$/i,
    fontsStylesRegex = /.(ttf|woff|eot|svg|woff2)$/i;



/*
** pipes
*/



var pipes = {};

// does nothing, only pass data through 
pipes.noop = function() {
    return gutil.noop();
};

// define order for vendor scripts
pipes.orderedVendorScripts = function() {
    return plugins.order([
        "jquery.js", 
        "angular.js"
    ]);
};

// sort angular files by correct order
pipes.orderedAppScripts = function() {
    return plugins.angularFilesort();
};

// create file names for minified versions
pipes.minifiedFileName = function() {
    return plugins.rename(function(path) {
        path.extname = ".min" + path.extname;
    });
};

// validate "path.scripts" with jshint
pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)
               .pipe(plugins.jshint())
               .pipe(plugins.jshint.reporter("jshint-stylish"));
};

// validate and move "path.scripts" to "path.distDev" development environment
pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
                .pipe(gulp.dest(paths.distDev));
};

// concatenates, uglifies and moves app scripts and partials to "path.distProd" productive environment
pipes.builtAppScriptsProd = function() {
    var scriptedPartials = pipes.scriptedPartialsProd();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
             .pipe(pipes.orderedAppScripts())
             .pipe(includeSourceMaps ? plugins.sourcemaps.init() : pipes.noop())
             .pipe(plugins.concat("app.min.js"))
             .pipe(plugins.uglify())
             .pipe(includeSourceMaps ? plugins.sourcemaps.write() : pipes.noop())
             .pipe(gulp.dest(paths.distScriptsProd));
};

// moves vendor scripts to "path.distDev" development environment
pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles({
                        filter: function(e) { return jsScriptsRegex.test(e); }
                    }))
               .pipe(gulp.dest(paths.distDev + "/bower_components"));
};

// concatenates, uglifies, and moves vendor scripts to "path.distProd" productive environment
pipes.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles({
                        filter: function(e) { return jsScriptsRegex.test(e); }
                    }))
               .pipe(pipes.orderedVendorScripts())
               .pipe(plugins.concat("vendor.min.js"))
               .pipe(plugins.uglify())
               .pipe(gulp.dest(paths.distScriptsProd));
};

// runs jshint on the "paths.scriptsDevServer" development server scripts
pipes.validatedDevServerScripts = function() {
    return gulp.src(paths.scriptsDevServer)
               .pipe(plugins.jshint())
               .pipe(plugins.jshint.reporter("jshint-stylish"));
};

// checks html source files "paths.partials" for syntax errors
pipes.validatedPartials = function() {
    return gulp.src(paths.partials)
               .pipe(plugins.htmlhint({"doctype-first": false}))
               .pipe(plugins.htmlhint.reporter());
};

// moves html source files into "paths.distDev" development environment
pipes.builtPartialsDev = function() {
    return pipes.validatedPartials()
                .pipe(gulp.dest(paths.distDev));
};

// converts partials to javascript and put them to angular's $templateCache using html2js and store them into "paths.distDev + '/templates'" development environment
pipes.scriptedPartialsDev = function() {
    return pipes.validatedPartials()
                .pipe(plugins.htmlhint.failReporter())
                .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
                .pipe(plugins.ngHtml2js({
                    moduleName: partialModuleName
                }))
                .pipe(gulp.dest(paths.distDev + "/templates"));
};

// converts partials to javascript and put them to angular's $templateCache using html2js and store them into "path.distProd" productive environment
pipes.scriptedPartialsProd = function() {
    return pipes.validatedPartials()
                .pipe(plugins.htmlhint.failReporter())
                .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
                .pipe(plugins.ngHtml2js({
                    moduleName: partialModuleName
                }))
                .pipe(plugins.concat("templates.min.js"))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(paths.distScriptsProd));
};

// moves css to "paths.distDev" development environment
pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
               .pipe(gulp.dest(paths.distDev));
};

// compile vendor less files
pipes.buildVendorStylesLess = function() {
    return gulp.src(bowerFiles({
                        filter: function(e) { return lessStylesRegex.test(e); }
                    }))
               .pipe(plugins.less({}));
};

// get vendor css files
pipes.builtVendorCssStyles = function() {
    return gulp.src(bowerFiles({
                        filter: function(e) { return cssStylesRegex.test(e); }
                    }));
};

// compile and move vendor css files into "path.distDev" development environment
pipes.builtVendorStylesDev = function() {
    return es.merge(pipes.buildVendorStylesLess(), pipes.builtVendorCssStyles())
             .pipe(gulp.dest(paths.distDev + "/styles"));
};

// compile, minifies, concatenates and move vendor css files into "path.distProd" productive environment
pipes.builtVendorStylesProd = function() {
    return es.merge(pipes.buildVendorStylesLess(), pipes.builtVendorCssStyles())
             .pipe(plugins.concat("vendor.min.css"))
             .pipe(plugins.minifyCss())
             .pipe(gulp.dest(paths.distProd + "/styles"));
};

// minifies app css and moves to "path.distProd" productive environment
pipes.builtStylesProd = function() {
    return gulp.src(paths.styles)
               .pipe(includeSourceMaps ? plugins.sourcemaps.init() : pipes.noop())
               .pipe(plugins.minifyCss())
               .pipe(includeSourceMaps ? plugins.sourcemaps.write() : pipes.noop())
               .pipe(pipes.minifiedFileName())
               .pipe(gulp.dest(paths.distProd));
};

// moves font files to given environment
pipes.processedFonts = function(basePath) {
    return gulp.src(bowerFiles({
                        filter: function(e) { return fontsStylesRegex.test(e); }
                    }),
                    {base: "bower_components"})
               .pipe(plugins.rename(function (path) {
                    var newPath, arrayPath = path.dirname.split("/");

                    if( arrayPath.length > 1 ) {
                        arrayPath.splice(0,1);
                        newPath = "../" + arrayPath.join('/');
                    } else {
                        newPath = "./";
                    }

                    path.dirname = newPath;
               }))
               .pipe(gulp.dest(basePath + "/styles"));
};

// moves image to "paths.distDev + '/images'" development environment
pipes.processedImagesDev = function() {
    return gulp.src(paths.images)
               .pipe(gulp.dest(paths.distDev + "/images/"));
};

// moves image to "paths.distProd + '/images'" productive environment
pipes.processedImagesProd = function() {
    return gulp.src(paths.images)
               .pipe(gulp.dest(paths.distProd + "/images/"));
};

// checks index.html for syntax errors
pipes.validatedIndex = function() {
    return gulp.src(paths.index)
               .pipe(plugins.htmlhint())
               .pipe(plugins.htmlhint.reporter());
};

// validates and injects sources into index.html and moves it to "paths.distDev" development environment
pipes.builtIndexDev = function() {
    var orderedVendorScripts = pipes.builtVendorScriptsDev().pipe(pipes.orderedVendorScripts()),
        orderedAppScripts = pipes.builtAppScriptsDev().pipe(pipes.orderedAppScripts()),
        scriptedPartialsDev = pipes.scriptedPartialsDev(),
        appStyles = pipes.builtStylesDev(),
        vendorStyles = pipes.builtVendorStylesDev();

    return pipes.validatedIndex()
                .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
                .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: "bower"}))
                .pipe(plugins.inject(scriptedPartialsDev, {relative: true, name: 'templates'}))
                .pipe(plugins.inject(orderedAppScripts, {relative: true}))
                .pipe(plugins.inject(appStyles, {relative: true}))
                .pipe(plugins.inject(vendorStyles, {relative: true, name: 'bower'}))
                .pipe(gulp.dest(paths.distDev));
};

// validates and injects sources into index.html, minifies and moves it to "path.distProd" productive environment
pipes.builtIndexProd = function() {
    var vendorScripts = pipes.builtVendorScriptsProd(),
        scriptedPartialsProd = pipes.scriptedPartialsProd(),
        appScripts = pipes.builtAppScriptsProd(),
        appStyles = pipes.builtStylesProd(),
        vendorStyles = pipes.builtVendorStylesProd();

    return pipes.validatedIndex()
                .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
                .pipe(plugins.inject(vendorScripts, {relative: true, name: "bower"}))
                .pipe(plugins.inject(scriptedPartialsProd, {relative: true, name: 'templates'}))
                .pipe(plugins.inject(appScripts, {relative: true}))
                .pipe(plugins.inject(appStyles, {relative: true}))
                .pipe(plugins.inject(vendorStyles, {relative: true, name: 'bower'}))
                .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
                .pipe(gulp.dest(paths.distProd));
};

// builds a complete development environment
pipes.builtAppDev = function() {
    // return es.merge(pipes.builtIndexDev(), pipes.processedFonts(paths.distDev), pipes.builtPartialsDev(), pipes.processedImagesDev());
    return es.merge(pipes.builtIndexDev(), pipes.processedFonts(paths.distDev), pipes.processedImagesDev());
};

// builds a complete productive environment
pipes.builtAppProd = function() {
    return es.merge(pipes.builtIndexProd(), pipes.processedFonts(paths.distProd), pipes.processedImagesProd());
};



/*
** tasks
*/



// default task builds for prod
gulp.task("default", ["clean-build-app-prod"]);

// checks html source files for syntax errors
gulp.task("validate-partials", pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task("validate-index", pipes.validatedIndex);

// moves html source files into the dev environment
gulp.task("build-partials-dev", pipes.builtPartialsDev);

// converts partials to javascript using html2js
gulp.task("convert-partials-to-js", pipes.scriptedPartialsDev);

// runs jshint on the dev server scripts
gulp.task("validate-devserver-scripts", pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task("validate-app-scripts", pipes.validatedAppScripts);

// moves app scripts into the dev environment
gulp.task("build-app-scripts-dev", pipes.builtAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task("build-app-scripts-prod", pipes.builtAppScriptsProd);

// moves css to the dev environment
gulp.task("build-styles-dev", pipes.builtStylesDev);

// minifies css and moves to the prod environment
gulp.task("build-styles-prod", pipes.builtStylesProd);

// moves vendor scripts into the dev environment
gulp.task("build-vendor-scripts-dev", pipes.builtVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task("build-vendor-scripts-prod", pipes.builtVendorScriptsProd);

// validates and injects sources into index.html and moves it to the dev environment
gulp.task("build-index-dev", pipes.builtIndexDev);

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task("build-index-prod", pipes.builtIndexProd);

// builds a complete dev environment
gulp.task("build-app-dev", pipes.builtAppDev);

// builds a complete prod environment
gulp.task("build-app-prod", pipes.builtAppProd);

// cleans and builds a complete dev environment
gulp.task("clean-build-app-dev", ["clean-dev"], pipes.builtAppDev);

// cleans and builds a complete prod environment
gulp.task("clean-build-app-prod", ["clean-prod"], pipes.builtAppProd);

// removes all compiled dev files
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

// clean, build, and watch live changes to the development environment
gulp.task("watch-dev", ["clean-build-app-dev", "validate-devserver-scripts"], function() {

    // start nodemon to auto-reload the development server
    plugins.nodemon({script: serverFolder + serverFile, ext: "js", watch: [serverFolder], env: {NODE_ENV: "development"}})
           .on("change", ["validate-devserver-scripts"])
           .on("restart", function () {
               console.log("[nodemon] restarted development server");
           });

    // start live-reload server
    plugins.livereload.listen({ start: true });

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexDev()
                    .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
                    .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.scriptedPartialsDev()
                    .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesDev()
                    .pipe(plugins.livereload());
    });
});

// clean, build, and watch live changes to the production environment
gulp.task("watch-prod", ["clean-build-app-prod", "validate-devserver-scripts"], function() {

    // start nodemon to auto-reload the production server
    plugins.nodemon({script: serverFolder + serverFile, ext: "js", watch: [serverFolder], env: {NODE_ENV: "productive"}})
           .on("change", ["validate-devserver-scripts"])
           .on("restart", function () {
               console.log("[nodemon] restarted production server");
           });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexProd()
                    .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
                    .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.scriptedPartialsProd()
                    .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesProd()
                    .pipe(plugins.livereload());
    });
});
