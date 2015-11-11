"use strict";

describe("when using controller directive", function()
{
    var controller;

    beforeEach(module("practice.directives"));
    beforeEach(inject(function($rootScope, $compile, $httpBackend) {
        var element = angular.element("<controller-directive format='test'></controller-directive>");
        var scope = $rootScope.$new();

        $httpBackend.expect("GET", "examples/directives/directives.controller.directive.tpl.html")
                    .respond(200);
        $compile(element)(scope);
        $rootScope.$digest();

        scope = element.isolateScope() || element.scope();
        $httpBackend.flush();
        controller = scope.$$childTail.controller;
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
