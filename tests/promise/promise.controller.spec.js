"use strict";

describe("when using promise controller public functions", function()
{
    var $q, $rootScope, controller, promiseService;

    beforeEach(module("practice.promise"));
    beforeEach(inject(function(_$q_, _$rootScope_, $controller, $injector) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        promiseService = $injector.get("promiseService");
        controller = $controller("practice.promiseController", { promiseService: promiseService });
    }));

    it("should be resolve on 'executeSuccessful'", function() {
        var result = false,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.then(function() {
            result = true;
        });

        controller.executeSuccessful().then(function() {
            deferred.resolve();
        });

        $rootScope.$digest();
        expect(result).toBeTruthy();
    });

    it("should be reject on 'executeFailure'", function() {
        var result = true,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.catch(function() {
            result = false;
        });

        controller.executeFailure().catch(function() {
            deferred.reject();
        });

        $rootScope.$digest();
        expect(result).toBeFalsy();
    });

    it("should be resolve on 'usePromise(true)'", function() {
        var result = false,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.then(function() {
            result = true;
        });

        controller.usePromise(true).then(function() {
            deferred.resolve();
        });

        $rootScope.$digest();
        expect(result).toBeTruthy();
    });

    it("should be reject on 'usePromise(false)'", function() {
        var result = true,
            deferred = $q.defer(),
            promise = deferred.promise;

        promise.catch(function() {
            result = false;
        });

        controller.usePromise(false).catch(function() {
            deferred.reject();
        });

        $rootScope.$digest();
        expect(result).toBeFalsy();
    });
});
