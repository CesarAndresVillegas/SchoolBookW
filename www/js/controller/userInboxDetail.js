angular.module('starter')
    .controller('userInboxDetail', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.approveFlag = false;
        $scope.reSendFlag = false;
        $scope.respondFlag = false;
        $scope.subjetMessage;
        $scope.senderMessage;
        $scope.textMessage;
        $scope.urlMessage;
        $scope.repositoryFlag = false;
        $scope.attachFlag = false;
        $scope.divFlag = false;
        $scope.messageDetails = {};
        $scope.init = function() {
            $scope.subjetMessage = SharedService.selectedMessage.subjet;
            $scope.senderMessage = SharedService.selectedMessage.remitente;
            $scope.textMessage = SharedService.selectedMessage.text;
            $scope.urlMessage = SharedService.selectedMessage.url;
            $scope.messageDetails = SharedService.selectedMessage;

            if ($scope.messageDetails.url) {
                $scope.repositoryFlag = true;
            } else {
                $scope.repositoryFlag = false;
            }

            if ($scope.messageDetails.attach) {
                $scope.attachFlag = true;
            } else {
                $scope.attachFlag = false;
            }

            if(!$scope.repositoryFlag && !$scope.attachFlag) {
                $scope.divFlag = false;
            } else {
                $scope.divFlag = true;
            }
        };

        $scope.back = function() {
            var backScreen = SharedService.backScreen;
            SharedService.backScreen = "adminMenu";
            $state.go(SharedService.backScreen);
        };

        $scope.goRepository = function() {
            window.open('https://docs.google.com/viewer?url=' + $scope.messageDetails.url + '&embedded=true', '_blank', 'location=yes');
        };

        $scope.goAttach = function() {
            window.open($scope.messageDetails.attach, '_blank', 'location=yes');
        };

        $scope.messageResponse = function() {
            $state.go("newMessage");
        };
    })
