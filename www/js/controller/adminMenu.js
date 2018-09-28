angular.module('starter')
    .controller('adminMenu', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.messageText = "Mensajes Recibidos";

        $scope.init = function() {
            $scope.updateInbox();
        };

        $scope.updateInbox = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'messages_users/getAdminInbox/' + SharedService.userData.id)
                .success(function(data) {
                    $scope.messageText = $scope.messageText + "(" + data.data.cant + ")";
                    $rootScope.hide();
                }).error(function(err) {
                    $rootScope.hide();
                    console.log(err.message);
                });
        };

        $scope.back = function() {
            $state.go("login");
        };

        $scope.userInbox = function(type) {
            SharedService.selectedType = type;
            SharedService.backScreen = "adminMenu";
            $state.go("userInbox");
        };

        $scope.newMessage = function() {
            $state.go("newMessage");
        };

        $scope.messageHistory = function() {
            $state.go("messageHistory");
        };

        $scope.documents = function() {
            $state.go("documents");
        };

        $scope.configurationMenu = function() {
            $state.go("configurationMenu");
        };

        $scope.test = function() {
            $state.go("userForm");
        };
    })
