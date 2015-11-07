"use strict";

describe("serving the directives page", function() {
    beforeEach(function() {
        browser.get("#/directives");
    });

    it("should have a headline h1", function() {
        var h1 = element(by.css("h1"));
        expect(h1.getText()).not.toBe("");
    });

    it("should have at least one content box", function() {
        var panel = element.all(by.css(".panel .panel-body"));
        expect(panel.count()).toBeGreaterThan(0);
    });

    it("should update text in controller directive", function() {
        var outerInput = element(by.model("data")),
            innerInput = element(by.model("controller.exchange"));

        outerInput.clear().sendKeys("test").then(function() {
            expect(innerInput.getAttribute("value")).toEqual("test");
        });
    });

    it("should update text out of controller directive", function() {
        var outerInput = element(by.model("data")),
            innerInput = element(by.model("controller.exchange"));

        innerInput.clear().sendKeys("test").then(function() {
            expect(outerInput.getAttribute("value")).toEqual("test");
        });
    });
});
