"use strict";

describe("when using controller directive", function()
{
    var controller;

    beforeEach(module("practice.directives"));
    beforeEach(inject(function($rootScope, $compile) {
        var element = angular.element("<controller-directive format='test'></controller-directive>");
        var scope = $rootScope;

        $compile(element)(scope);
        $rootScope.$digest();
        scope = element.isolateScope() || element.scope();

        controller = scope.controller;
    }));

    it("should have a date", function() {
        expect(controller.date).toBeDefined();
    });

    it("should have exchange data defined", function() {
        expect(controller.exchange).toBeDefined();
    });

    it("should pass date format correctly", function() {
        expect(controller.format).toBe("test");
    });
});
