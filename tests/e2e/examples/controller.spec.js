"use strict";

describe("serving the controller page", function() {
    beforeEach(function() {
        browser.get("#/controller");
    });

    it("should have a headline h1", function() {
        var h1 = element(by.css("h1"));
        expect(h1.getText()).not.toBe("");
    });

    it("should have at least one content box", function() {
        var panel = element.all(by.css(".panel .panel-body"));
        expect(panel.count()).toBeGreaterThan(0);
    });

    it("should alert a correct message", function() {
        element(by.model("myName")).sendKeys("test");
        element(by.css("button")).click();

        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);

        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("Congratulation test, you clicked the button!");
        alertDialog.accept();
    });
});
