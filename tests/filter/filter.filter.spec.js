"use strict";

describe("when using the startsWith filter", function()
{
    var filter, entries;

    beforeEach(angular.mock.module("practice.filter"));
    beforeEach(angular.mock.inject(function($filter) {
        filter = $filter("startsWith");
        entries = [
            { name: "a" },
            { name: "b" },
            { name: "b" },
            { name: "c" },
            { name: "c" },
            { name: "c" }
        ];
    }));

    it("should filter to correct length", function() {
        var result = filter(entries, "b");
        expect(result.length).toBe(2);
    });

    it("should return all entries on undefined expression", function() {
        var result = filter(entries);
        expect(result.length).toBe(entries.length);
    });

    it("should return all entries on empty expression", function() {
        var result = filter(entries, "");
        expect(result.length).toBe(entries.length);
    });

    it("should return nothing on non containing search", function() {
        var result = filter(entries, "d");
        expect(result.length).toBe(0);
    });
});
