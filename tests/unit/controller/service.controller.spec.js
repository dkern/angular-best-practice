"use strict";

describe("when using controller example controller", function()
{
    var controller;

    beforeEach(module("practice.controller"));
    beforeEach(inject(function($controller) {
        controller = $controller("practice.controllerController");
        spyOn(window, "alert");
    }));

    it("should have a headline", function() {
        expect(controller.headline).toBeDefined();
    });

    it("should have a location", function() {
        expect(controller.location).toBeDefined();
    });

    it("should have at least on entry", function() {
        expect(controller.files.length).toBeGreaterThan(0);
    });

    it("should display correct message", function() {
        var name = "test";
        controller.action(name);

        expect(window.alert).toHaveBeenCalledWith("Congratulation " + name + ", you clicked the button!");
    });
});
