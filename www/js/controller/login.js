angular.module('starter')
    .controller('login', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        // Objeto de usuario.
        $scope.user = {};
        $scope.isProcessing = false;

        $scope.init = function() {

        };

        $scope.back = function() {
            $state.go("launchPad");
        };

        $scope.login = function() {
            if (!$scope.user.user) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error.',
                    template: 'Ingrese un nombre de usuario'
                });
                return;
            }

            if (!$scope.user.pass) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error.',
                    template: 'Ingrese una contraseña'
                });
                return;
            }
            $rootScope.show();
            $http.get($rootScope._host + 'users/login/' + $scope.user.user + '/' + $scope.user.pass)
                .success(function(data) {
                    $window.localStorage.setItem('user', $scope.user.user);
                    SharedService.userData = data.data;
                    $rootScope.hide();
                    $state.go("adminMenu");
                    // Registro One Signal
                }).error(function(err) {
                    $rootScope.hide();
                    $rootScope.showAlert("Error", err.message);
                });
        };

        document.getElementById("passW")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    $scope.login();
                }
            });

        document.getElementById("correo")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    $scope.login();
                }
            });
    })
