angular.module('starter')
    .controller('configurationMenu', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {

        $scope.init = function() {
            
        };

        $scope.back = function() {
            $state.go("adminMenu");
        };

        $scope.goUsersConfiguration = function() {
            $state.go("configureUsers");
        };

        $scope.goStudentsConfiguration = function() {
            $state.go("configureStudents");
        };

        $scope.goGroupsConfiguration = function() {
            $state.go("configureGroups");
        };

        $scope.goRoutesConfiguration = function() {
            $state.go("configureRoutes");
        };

        $scope.goInstitutionConfiguration = function() {
            $state.go("configureInstitution");
        };
    })
