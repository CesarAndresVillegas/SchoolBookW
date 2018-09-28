// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
    .run(function($ionicPlatform, $rootScope, $ionicLoading, $ionicPopup) {
        // $rootScope._host = "http://simple-it.co/apis/schoolbook/v1.0/";
        $rootScope.show = function() {
            $ionicLoading.show({
                template: 'Cargando...'
            });
        };
        $rootScope.hide = function() {
            $ionicLoading.hide();
        };
        $rootScope.showAlert = function(title, message) {
            return $ionicPopup.alert({
                title: title,
                template: message
            });
        };
        $rootScope.showConfirm = function(title, message) {
            return $ionicPopup.confirm({
                title: title,
                template: message
            });
        };
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
