angular.module('starter')
    .controller('map', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $timeout) {
        $scope.controlDisabled = false;
        $scope.map;
        $scope.marker;
        $scope.currentWay;
        $scope.lastWay;

        $scope.init = function() {
            navigator.geolocation.getCurrentPosition(function(data) {
                    $rootScope.hide();
                    var slat = data.coords.latitude;
                    var slng = data.coords.longitude;

                    var latLng = new google.maps.LatLng(slat, slng);

                    var mapOptions = {
                        center: latLng,
                        zoom: 17,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        streetViewControl: false,
                        navigationControl: false,
                        disableDefaultUI: true
                    };

                    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    $scope.setPosition(latLng);

                    google.maps.event.addListener($scope.map, 'center_changed', function() {
                        $timeout(function() {
                            var center = $scope.map.getCenter();
                            $scope.setPosition(center);
                        }, 100);
                    });
                },
                function(err) {
                    console.log(err);
                    $rootScope.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se ha logrado determinar tu posición, verifica que el GPS este encendido.'
                    });
                    $state.go("agregarTrayecto");
                }, { timeout: 7000 }
            );
        };

        $scope.goBack = function() {
            $state.go("userInbox");
        };

        $scope.setPosition = function(pos) {
            if ($scope.marker == null) {
                $scope.marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: pos
                });
            } else {
                $scope.marker.setPosition(pos);
            }
        }
    })
