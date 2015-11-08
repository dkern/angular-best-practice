"use strict";

var express        = require("express");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var path           = require("path");
var app            = express();
var port           = process.env.PORT || 1337;
var environment    = process.env.NODE_ENV || "development";

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("X-HTTP-Method-Override"));

// remap used directories
app.use(express.static(path.join(__dirname, "..", "dist", environment)));
app.use("/bower_components",  express.static(path.join(__dirname, ".." , "bower_components")));

// routes
require("./routes")(app);

// start server
app.listen(port);
console.log("Server now listening on http://localhost:" + port + " ...");
exports = module.exports = app;
