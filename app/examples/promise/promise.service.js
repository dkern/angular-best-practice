(function() {
    'use strict';
    angular.module("practice.promise")
           .service("promiseService", promiseService);

    // always use $inject to make functions minify-able
    // @see https://docs.angularjs.org/guide/di
    promiseService.$inject = ["$q"];

    function promiseService($q) {
        var self = this;

        // define public variables for this service
        self.usePromise = usePromise;

        // function definitions below

        /**
         * creates and returns a promise
         * @see https://docs.angularjs.org/api/ng/service/$q
         * @param {boolean} shouldResolve
         * @returns {promise}
         */
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
