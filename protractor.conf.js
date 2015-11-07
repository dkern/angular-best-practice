exports.config = {
    // address of the selenium server
    seleniumAddress: "http://localhost:4444/wd/hub",

    // file pattern to match e2e tests
    specs: ["tests/e2e/**/*.spec.js"],

    // base url where angular application is reachable
    baseUrl: "http://localhost:1337/",

    // browsers to start by protractor
    capabilities: {
        'browserName': 'chrome'
    }
};
