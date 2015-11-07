"use strict";

describe("serving the filter page", function() {
    beforeEach(function() {
        browser.get("#/filter");
    });

    it("should have a headline h1", function() {
        var h1 = element(by.css("h1"));
        expect(h1.getText()).not.toBe("");
    });

    it("should have at least one content box", function() {
        var panel = element.all(by.css(".panel .panel-body"));
        expect(panel.count()).toBeGreaterThan(0);
    });

    it("should filter to a correct amount", function() {
        element(by.model("query")).sendKeys("one");
        var entries = element.all(by.css("ul.results li"));

        expect(entries.count()).toBe(1);
    });

    it("should return nothing on wrong input", function() {
        element(by.model("query")).sendKeys("test");
        var entries = element.all(by.css("ul.results li"));

        expect(entries.count()).toBe(0);
    });

    it("should update displayed amount on filter", function() {
        element(by.model("query")).sendKeys("one");
        var results = element(by.css("span.results"));

        expect(results.getText()).toBe("1");
    });
});
