"use strict";

var util        = require("gulp-util");
var order       = require("gulp-order");
var angularSort = require("gulp-angular-filesort");
var orders      = require("../config/orders");

module.exports = {
    // no-operation pipe
    noop: util.noop,

    // sort angular files by correct order
    orderedAppScripts: function() {
        return angularSort();
    },

    // define order for vendor scripts
    orderedVendorScripts: function() {
        return order(orders.vendorScripts);
    },

    // define order for vendor styles
    orderedVendorStyles: function()
    {
        return order(orders.vendorStyles);
    }
};
