var appRoot = "app/";
var distRoot = "dist/";

// path configuration
module.exports = {
    // app
    scripts: appRoot + "**/*.js",
    styles: appRoot + "**/*.css",
    images: appRoot + "images/**/*",
    index: appRoot + "index.html",
    fonts: [
        appRoot + "**/*.ttf",
        appRoot + "**/*.eot",
        appRoot + "**/*.svg",
        appRoot + "**/*.woff",
        appRoot + "**/*.woff2"
    ],
    partials: [
        appRoot + "**/*.html", 
        "!" + appRoot + "index.html"
    ],

    // distribution
    distDev: distRoot + "development",
    distProd: distRoot + "productive",
    distScriptsProd: distRoot + "productive/scripts"
};
