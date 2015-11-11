// general build configuration
module.exports = {
    // add a timestamp to all development scripts and styles
    addTimestampToDevelopmentFiles: false,

    // add a timestamp to all productive scripts and styles
    addTimestampToProductiveFiles: true,
    
    // include source maps in production files
    includeSourceMaps: false,

    // filename of minified app scripts
    appMinFile: "app.min.js",

    // filename of minified vendor styles
    vendorMinCssFile: "vendor.min.css",

    // filename of minified vendor scripts
    vendorMinScriptFile: "vendor.min.js"
};
