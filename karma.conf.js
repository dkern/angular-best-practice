// Karma configuration
module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath : './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files : [
            // angular dependencies
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            // app - module definitions first
            'app/**/*.module.js',
            'app/**/*.js',
            // tests
            'tests/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [
            'tests/output/**/*.spec.js',
            'tests/e2e/**/*.spec.js'
        ],

        // pre-process matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            'junit'
        ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome',
            'Firefox',
            //'Safari',
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // plugins to load by Karma
        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        // junit report configuration
        junitReporter : {
            // results will be saved as $outputDir/$browserName.xml
            outputDir: '',

            // if included, results will be saved as $outputDir/$browserName/$outputFile
            outputFile: "tests/output/karma-result.xml",

            // suite will become the package name attribute in xml test suite element
            suite: 'unit',

            // add browser name to report and classes names
            useBrowserName: true
        }
    });
};
