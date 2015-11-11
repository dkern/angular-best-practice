"use strict";

describe("when using the practiceService", function()
{
    var practiceService;

    beforeEach(module("practice.service"));
    beforeEach(inject(function($injector) {
        practiceService = $injector.get("practiceService");
        spyOn(window, "alert");
    }));

    it("should alert 'used practiceService.publicFunction ...'", function() {
        practiceService.publicFunction();
        expect(window.alert).toHaveBeenCalledWith("used practiceService.publicFunction ...");
    });

    it("should alert 'test message'", function() {
        practiceService.verboseMessage("test message");
        expect(window.alert).toHaveBeenCalledWith("test message");
    });
});
