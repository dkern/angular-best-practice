"use strict";

describe("when using service controller", function()
{
    var controller;

    beforeEach(module("practice.service"));
    beforeEach(inject(function($controller) {
        controller = $controller("practice.serviceController", { practiceService: "service" });
    }));

    it("should register service correctly", function() {
        expect(controller.service).toBe("service");
    });

    it("should have a message", function() {
        expect(controller.message).toBeDefined();
    });
});
