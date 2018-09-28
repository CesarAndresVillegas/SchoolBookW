angular.module('starter')
    .controller('userInbox', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.routeFlag = false;
        $scope.inboxList = [];
        $scope.idUserCurrentIndex;

        $scope.init = function() {
            $scope.getAllInboxList();
        };

        $scope.back = function() {
            $state.go(SharedService.backScreen);
        };

        $scope.getAllInboxList = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'messages_users/getInboxUser/' + SharedService.userData.id)
                .success(function(data) {
                    $scope.inboxList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        $scope.selectMessage = function(index) {
            var data = {
                id: $scope.inboxList[index].mu_id,
                readed: 1
            };

            $rootScope.show();
            $http.put($rootScope._host + 'messages_users/updateMessagesReaded', data)
                .success(function(data) {
                    SharedService.selectedMessage = $scope.inboxList[index];
                    $rootScope.hide();
                    SharedService.backScreen = "userInbox";
                    $state.go("userInboxDetail");
                })
                .error(function(data) {
                    $rootScope.hide();
                });
        };

        $scope.addFav = function(index) {
            var favourite;
            if (Number($scope.inboxList[index].fav)) {
                favourite = "0";
            } else {
                favourite = "1";
            }

            var data = {
                id: $scope.inboxList[index].mu_id,
                fav: favourite
            };

            $rootScope.show();
            $http.put($rootScope._host + 'messages_users/updateMessagesFav', data)
                .success(function(data) {
                    $rootScope.hide();
                    $scope.getAllInboxList();
                })
                .error(function(data) {
                    $rootScope.hide();
                });
        };
    })
