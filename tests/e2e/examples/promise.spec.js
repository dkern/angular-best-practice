"use strict";

describe("serving the promise page", function() {
    beforeEach(function() {
        browser.get("#/promise");
    });

    it("should have a headline h1", function() {
        var h1 = element(by.css("h1"));
        expect(h1.getText()).not.toBe("");
    });

    it("should have at least one content box", function() {
        var panel = element.all(by.css(".panel .panel-body"));
        expect(panel.count()).toBeGreaterThan(0);
    });

    it("should alert a correct message on resolve", function() {
        element.all(by.css("button")).first().click();

        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);

        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("promiseService.usePromise successful");
        alertDialog.accept();
    });

    it("should alert a correct message on reject", function() {
        element.all(by.css("button")).last().click();

        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);

        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("promiseService.usePromise failed");
        alertDialog.accept();
    });
});
