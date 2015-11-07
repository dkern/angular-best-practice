"use strict";

describe("when using filter controller", function()
{
    var controller;

    beforeEach(module("practice.filter"));
    beforeEach(inject(function($controller) {
        controller = $controller("practice.filterController");
    }));

    it("should have at least one text entry", function() {
        expect(controller.entries.length).toBeGreaterThan(0);
    });
});
