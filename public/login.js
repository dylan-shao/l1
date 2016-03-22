(function() {
    'use strict';
    angular.module('app').directive('myLogin', function() {
        return {
            restrict: 'E',
            templateUrl: 'login.html',
            scope: {
                user : '='
            },
            controller: 'LoginCtrl as login'

        }
    });
})();
