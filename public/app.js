(function() {
    'use strict';

    angular.module('app', [])
        .factory('login', function($http) {
            var loginInfo = {};
            var changes = [];
            var change = function(data){
                changes.forEach(function(fn){
                    fn(data);
                });
                loginInfo.info = data;
                return loginInfo;
            };
            return {
                login: function(username, password) {
                    return $http.post('/api/login', {
                        username: username,
                        password: password
                    }).then(function(data) {
                        change(data);
                        loginInfo.username = data.data.username;
                    })
                },
                logout: function() {
                    return $http.delete('/api/login').then(function() {
                        change();
                        loginInfo.username = undefined;
                        return loginInfo;
                    })
                },
                isLogin: function() {
                    return $http.get('/api/login').then(function(data) {
                        change();
                        loginInfo.username = data.data.username;
                        return loginInfo;
                    });
                },
                loginInfo: loginInfo
                onchange: function(fn){
                   
                    }

            }

        })
        .controller('MainCtrl', function($scope, login) {
            $scope.logout = function() {
                login.logout();
            };
            $scope.$watch(function() {
                    return login.loginInfo.username;
                },
                function(n, o) {
                    if (!!n) $scope.user = {
                        username: n
                    };
                    else $scope.user = undefined;
                });
        })
        .controller('LoginCtrl', ['login', '$scope',
            function(login, $scope) {
                var self = this;
                login.isLogin();
                self.login = function(user) {
                    login.login(user.username, user.password);
                }
                $scope.$watch(function() {
                        return login.loginInfo.username;
                    },
                    function(n, o) {
                        if (!!n) self.user = {
                            username: n
                        };
                        else self.user = undefined;
                    });

            }
        ]);
})();
