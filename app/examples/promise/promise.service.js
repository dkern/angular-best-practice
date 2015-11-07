(function() {
    'use strict';
    angular.module("practice.promise")
           .service("promiseService", promiseService);

    promiseService.$inject = ["$q"];

    function promiseService($q) {
        var self = this;
        self.usePromise = usePromise;

        function usePromise(shouldResolve) {
            var deferral = $q.defer();

            if( typeof shouldResolve === "boolean" && shouldResolve ) {
                deferral.resolve("promiseService.usePromise successful");
            } else {
                deferral.reject("promiseService.usePromise failed");
            }

            return deferral.promise;
        }
    }
}());
