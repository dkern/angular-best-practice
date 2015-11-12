var serverRoot = "server/";

// server file configuration
module.exports = {
    // folder where the server file is stored
    folder: serverRoot,

    // name of the server script inside "serverFolder"
    file: "server.js",

    // server files autoload path
    scripts: serverRoot + "**/*.js",

    // port on localhost for server running on 'watch-dev'
    developmentPort: 1337,

    // port on localhost for server running on 'watch-prod'
    productivePort: 1338
};
