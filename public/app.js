(function() {
    'use strict';

    angular.module('app', [])
        .controller('MainCtrl', function($scope) {
            $scope.logout = function() {
                $http.delete('/api/login').success(function() {
                    self.user = undefined
                })
            };
            $scope.$on('login success', function(){
                $scope.user = user;
            });
        })
        .controller('LoginCtrl', ['$scope', '$http', '$rootScope',
            function($scope, $http, $rootScope) {
                var self = this;
                $http.get('/api/login').success(function(resp) {
                    if (resp.username)
                        self.user = resp;
                });
                self.login = function(user) {
                    $http.post('/api/login', user).then(function(data) {
                        if (data.data.username) {
                            self.user = {username: data.data.userame};
                            $rootScope.$broadcast('login sucess', self.user);
                    } 
                    else self.msg = data.data.msg;
                    });
                }

            }
        ]);
})();
