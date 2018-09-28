angular.module('starter')
    .controller('launchPad', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        // Objeto de usuario.
        $scope.client = {};

        $scope.init = function() {
            $rootScope._host = "";
        };

        $scope.login = function() {
            if ($scope.client.selected === undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error.',
                    template: 'Seleccione la institución a la que desea ingresar'
                });
                return;
            }

            try {
                $rootScope._host = SharedService.selectedHost[$scope.client.selected].host;
            } catch (ex) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error.',
                    template: 'La institución no se encuentra correctamente configurada'
                });
                return;
            }
            $rootScope._host = SharedService.selectedHost[$scope.client.selected].host;
            if ($rootScope._host) {
                $state.go("login");
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error.',
                    template: 'La institución no se encuentra correctamente configurada'
                });
                return;
            }
        };

        document.getElementById("combo")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    $scope.login();
                }
            });
    })
