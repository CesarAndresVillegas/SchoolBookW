angular.module('starter')
    .controller('configureInstitution', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.institutionList = [];
        $scope.institution = {};
        $scope.idRegister;
        $scope.idCurrentIndex;

        $scope.init = function() {
            $scope.institution = {};
            $scope.getAllInstitutions();
        };

        document.getElementById("uploadBtn").onchange = function() {
            document.getElementById("uploadFile").value = this.value;
        };

        $scope.getAllInstitutions = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'institution/getAll')
                .success(function(data) {
                    $scope.institutionList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                    $scope.institutionList = [];
                    $rootScope.hide();
                });
        };

        $scope.back = function() {
            $state.go("configurationMenu");
        };

        $scope.createInstitutions = function() {
            if (!$scope.institution.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre de la institución');
                return;
            }

            if (!$scope.institution.nit) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nit de la institución');
                return;
            }

            if (!$scope.institution.city) {
                $rootScope.showAlert('Error', 'Por favor ingrese la ciudad de la institución');
                return;
            }

            if (!$scope.institution.contact_phone) {
                $rootScope.showAlert('Error', 'Por favor ingrese el teléfono de contacto de la institucón');
                return;
            }

            var fileUploaded = angular.element(document.querySelector('#uploadBtn'));
            if (fileUploaded[0].files.length == 0) {
                $rootScope.showAlert('Error', 'Por favor seleccione el logo de la institución');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var fd = new FormData();

                    fd.append('file', fileUploaded[0].files[0]);

                    fd.append("name", $scope.institution.name);
                    fd.append("nit", $scope.institution.nit);
                    fd.append("city", $scope.institution.city);
                    fd.append("contact_phone", $scope.institution.contact_phone);
                    $rootScope.show();
                    $http.post($rootScope._host + 'institution/create', fd, {
                            withCredentials: false,
                            headers: {
                                'Content-Type': undefined
                            },
                            transformRequest: angular.identity
                        })
                        .success(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Exito', data.message);
                            $scope.getAllInstitutions();
                        }).error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        $scope.updateInstitutions = function() {
            if (!$scope.institution.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre de la institución');
                return;
            }

            if (!$scope.institution.nit) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nit de la institución');
                return;
            }

            if (!$scope.institution.city) {
                $rootScope.showAlert('Error', 'Por favor ingrese la ciudad de la institución');
                return;
            }

            if (!$scope.institution.contact_phone) {
                $rootScope.showAlert('Error', 'Por favor ingrese el teléfono de contacto de la institucón');
                return;
            }

            if (!$scope.idRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione una institución de la lista');
                return;
            }

            $rootScope.showConfirm('Actualizar', 'Desea actualizar el registro ?').then(function(res) {
                if (res) {

                    var fd = new FormData();

                    try {
                        var fileUploaded = angular.element(document.querySelector('#uploadBtn'));
                        fd.append('file', fileUploaded[0].files[0]);
                    } catch (ex) {
                        fd.append('file', "");
                    }

                    fd.append("id", $scope.idRegister);
                    fd.append("name", $scope.institution.name);
                    fd.append("nit", $scope.institution.nit);
                    fd.append("city", $scope.institution.city);
                    fd.append("contact_phone", $scope.institution.contact_phone);

                    $rootScope.show();
                    $http.post($rootScope._host + 'institution/update', fd, {
                            withCredentials: false,
                            headers: {
                                'Content-Type': undefined
                            },
                            transformRequest: angular.identity
                        })
                        .success(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Exito', data.message);
                            $scope.getAllInstitutions();
                        }).error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        $scope.gridClick = function(index) {
            $rootScope.showConfirm('Confirmación', 'Desea visualizar los datos de la institución?').then(function(res) {
                if (res) {
                    $scope.idCurrentIndex = index;
                    $scope.idRegister = $scope.institutionList[index].id;
                    $scope.institution.name = $scope.institutionList[index].name;
                    $scope.institution.nit = $scope.institutionList[index].nit;
                    $scope.institution.city = $scope.institutionList[index].city;
                    $scope.institution.contact_phone = Number($scope.institutionList[index].contact_phone);
                    $scope.institution.logo = $scope.institutionList[index].logo;
                }
            });
        };
    })
