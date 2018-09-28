angular.module('starter')
    .controller('documents', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.document = {};
        $scope.messagesTypeList = [];
        $scope.documentList = [];
        $scope.idRegister;
        $scope.idCurrentIndex;

        $scope.init = function() {
            $scope.getAllRepository();
            $scope.getAllMessagesTypeList();
        };

        $scope.back = function() {
            $state.go("adminMenu");
        };

        document.getElementById("uploadBtn").onchange = function() {
            document.getElementById("uploadFile").value = this.value;
        };

        $scope.openDoc = function(index) {
            var documentRoute = $scope.documentList[index].url;
            window.open(documentRoute, "_blank");
        };

        $scope.delete = function(index) {
            if (!index) {
                $rootScope.showAlert('Error', 'Por favor seleccione el documento que desea eliminar');
                return;
            }

            if ($scope.documentList.length == 0) {
                $rootScope.showAlert('Error', 'No hay documentos registrados');
                return;
            }

            var id = $scope.documentList[index].id;

            $rootScope.showConfirm('Borrar', 'Desea eliminar el registro ?').then(function(res) {
                if (res) {
                    $rootScope.show();
                    $http.delete($rootScope._host + 'repository/delete/' + id)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllRepository();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        // CREAR un repository
        $scope.createRepository = function() {
            var fileUploaded = angular.element(document.querySelector('#uploadBtn'));
            if (fileUploaded[0].files.length == 0) {
                $rootScope.showAlert('Error', 'Por favor seleccione un documento tipo .pdf');
                return;
            }

            if (!$scope.document.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre del documento');
                return;
            }

            if (!$scope.document.messages_type_id) {
                $rootScope.showAlert('Error', 'Por favor seleccione el tipo de documento');
                return;
            }

            var validation = fileUploaded[0].files[0].name.split(".");

            if (validation[1] != "pdf") {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Debe seleccionar un archivo de tipo .pdf'
                });
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var fd = new FormData();

                    fd.append('url', fileUploaded[0].files[0]);

                    fd.append("name", $scope.document.name);
                    fd.append("messages_type_id", $scope.document.messages_type_id.id);
                    $rootScope.show();
                    $http.post($rootScope._host + 'repository/create', fd, {
                            withCredentials: false,
                            headers: {
                                'Content-Type': undefined
                            },
                            transformRequest: angular.identity
                        })
                        .success(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Exito', data.message);
                            $scope.getAllRepository();
                        }).error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        // OBTENER todos los repository
        $scope.getAllRepository = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'repository/getAllMessage')
                .success(function(data) {
                    $scope.documentList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $scope.documentList = [];
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // OBTENER todos los tipos de mensaje
        $scope.getAllMessagesTypeList = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'messages_type/getAll')
                .success(function(data) {
                    $scope.messagesTypeList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // ACTUALIZAR un repository por id.
        $scope.updateRepository = function() {

            if (!$scope.document.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre del documento');
                return;
            }

            if (!$scope.document.messages_type_id) {
                $rootScope.showAlert('Error', 'Por favor seleccione el tipo de documento');
                return;
            }

            if (!$scope.idRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione el documento que desea modificar');
                return;
            }

            var fileUploaded = angular.element(document.querySelector('#uploadBtn'));
            if (fileUploaded[0].files.length > 0) {
                var validation = fileUploaded[0].files[0].name.split(".");

                if (validation[1] != "pdf") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Debe seleccionar un archivo de tipo .pdf'
                    });
                    return;
                }
            }

            $rootScope.showConfirm('Actualizar', 'Desea actualizar el registro ?').then(function(res) {
                if (res) {
                    var fd = new FormData();

                    fd.append('url', fileUploaded[0].files[0]);

                    fd.append("id", $scope.idRegister);
                    fd.append("name", $scope.document.name);
                    fd.append("messages_type_id", $scope.document.messages_type_id.id);
                    $rootScope.show();
                    $http.post($rootScope._host + 'repository/update', fd, {
                            withCredentials: false,
                            headers: {
                                'Content-Type': undefined
                            },
                            transformRequest: angular.identity
                        })
                        .success(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Exito', data.message);
                            $scope.getAllRepository();
                        }).error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        $scope.gridClick = function(index) {
            $rootScope.showConfirm('Confirmación', 'Desea visualizar los datos del documento?').then(function(res) {
                if (res) {
                    $scope.idCurrentIndex = index;
                    $scope.idRegister = $scope.documentList[index].id;
                    $scope.document.name = $scope.documentList[index].name;
                    $scope.document.url = $scope.documentList[index].url;

                    for (var i = 0; i < $scope.messagesTypeList.length; i++) {
                        if ($scope.messagesTypeList[i].id == $scope.documentList[index].messages_type_id) {
                            $scope.document.messages_type_id = $scope.messagesTypeList[i];
                            break;
                        }
                    }
                }
            });
        };
    })
