angular.module('starter')
    .controller('userProfile', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        // Objeto de usuario.
        $scope.init = function() {

        };

        $scope.back = function() {
            $state.go("mainMenu");
        };
    })
