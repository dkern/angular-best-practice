"use strict";

describe("when using the promiseService", function()
{
    var $q, $rootScope, promiseService;

    beforeEach(module("practice.promise"));
    beforeEach(inject(function(_$q_, _$rootScope_, $injector) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        promiseService = $injector.get("promiseService");
    }));

    it("should be resolve on 'true'", function() {
        var result = false,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.then(function() {
            result = true;
        });

        promiseService.usePromise(true).then(function() {
            deferred.resolve();
        });

        $rootScope.$digest();
        expect(result).toBeTruthy();
    });

    it("should be reject on 'false'", function() {
        var result = true,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.catch(function() {
            result = false;
        });

        promiseService.usePromise(false).catch(function() {
            deferred.reject();
        });

        $rootScope.$digest();
        expect(result).toBeFalsy();
    });

    it("should be reject on string", function() {
        var result = true,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.catch(function() {
            result = false;
        });

        promiseService.usePromise("string").catch(function() {
            deferred.reject();
        });

        $rootScope.$digest();
        expect(result).toBeFalsy();
    });

    it("should be reject on integer", function() {
        var result = true,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.catch(function() {
            result = false;
        });

        promiseService.usePromise(1337).catch(function() {
            deferred.reject();
        });

        $rootScope.$digest();
        expect(result).toBeFalsy();
    });
});
