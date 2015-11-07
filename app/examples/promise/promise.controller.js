(function() {
    'use strict';
    angular.module("practice.promise")
        .controller("practice.promiseController", promiseController);

    promiseController.$inject = ["promiseService"];

    function promiseController(promiseService) {
        var self = this;
        self.executeSuccessful = executeSuccessful;
        self.executeFailure = executeFailure;
        self.usePromise = usePromise;

        /**
         * use promiseService promise and let it resolve
         * @returns {promiseService}
         */
        function executeSuccessful() {
            return self.usePromise(true);
        }

        /**
         * use promiseService promise and let it reject
         * @returns {promiseService}
         */
        function executeFailure() {
            return self.usePromise(false);
        }

        /**
         * use promiseService promise and determine if it should resolve
         * @param {boolean} shouldResolve
         * @returns {promiseService}
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
