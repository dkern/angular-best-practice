(function() {
    'use strict';
    angular.module("practice.promise")
           .controller("practice.promiseController", promiseController);

    // always use $inject to make functions minify-able
    // @see https://docs.angularjs.org/guide/di
    promiseController.$inject = ["promiseService"];

    function promiseController(promiseService) {
        var self = this;

        // define public variables for own scope
        self.executeSuccessful = executeSuccessful;
        self.executeFailure = executeFailure;
        self.usePromise = usePromise;

        // function definitions below

        /**
         * use promiseService promise and let it resolve
         * @returns {promise}
         */
        function executeSuccessful() {
            return self.usePromise(true);
        }

        /**
         * use promiseService promise and let it reject
         * @returns {promise}
         */
        function executeFailure() {
            return self.usePromise(false);
        }

        /**
         * use promiseService promise and determine if it should resolve
         * @param {boolean} shouldResolve
         * @returns {promise}
         */
        function usePromise(shouldResolve) {
            var promise = promiseService.usePromise(shouldResolve);

            promise.then(function(response) {
                console.log(response);
                alert(response);
            }).catch(function(error) {
                console.log(error);
                alert(error);
            });

            return promise;
        }
    }
}());
