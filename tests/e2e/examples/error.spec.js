"use strict";

describe("serving the error page", function() {
    beforeEach(function() {
        browser.get("#/error");
    });

    it("should have a headline h1", function() {
        var h1 = element(by.css("h1"));
        expect(h1.getText()).not.toBe("");
    });

    it("should have at least one content box", function() {
        var panel = element.all(by.css(".panel .panel-body"));
        expect(panel.count()).toBeGreaterThan(0);
    });
});
