"use strict";

describe("serving the base layout", function() {
    beforeEach(function() {
        browser.get("#/");
    });

    it("should have a page title", function() {
        expect(browser.getTitle()).not.toBe("");
    });

    it("should have a home link on header", function() {
        var header = element(by.css('nav .navbar-header a.navbar-brand'));
        expect(header.getAttribute("href")).toBe("http://localhost:1337/#/");
    });

    it("should have global nav-bar entries", function() {
        var entries = element.all(by.css('nav ul.nav li'));
        expect(entries.count()).toBeGreaterThan(0);
    });

    it("should set active class on click", function() {
        var hasClass = function (element, cssClass) {
            return element.getAttribute('class').then(function (classes) {
                return classes.split(' ').indexOf(cssClass) !== -1;
            });
        };

        var firstEntry = element.all(by.css('nav ul.nav li')).first();
        firstEntry.element(by.css("a")).click();

        expect(hasClass(firstEntry, 'active')).toBeTruthy();
    });
});
