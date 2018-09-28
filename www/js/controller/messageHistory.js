angular.module('starter')
    .controller('messageHistory', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.historyList = [];

        $scope.init = function() {
            $scope.getAllHistoryMessages();
        };

        $scope.back = function() {
            $state.go("adminMenu");
        };

        $scope.selectMessage = function(index) {
            SharedService.backScreen = "messageHistory";
            SharedService.selectedMessage = $scope.historyList[index];
            $state.go("userInboxDetail");
        };

        $scope.getAllHistoryMessages = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'messages_users/getHistoryUser/' + SharedService.userData.id)
                .success(function(data) {
                    $scope.historyList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };
    })
