angular.module('starter')
    .controller('configureUsers', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.userList = [];
        $scope.users = {};
        $scope.idRegister;
        $scope.idCurrentIndex;

        $scope.init = function() {
            $scope.getAllUsers();
        };

        $scope.back = function() {
            $state.go("configurationMenu");
        };


        // CREAR un users
        $scope.createUsers = function() {
            if (!$scope.users.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre');
                return;
            }

            if (!$scope.users.last_name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el apellido');
                return;
            }

            if (!$scope.users.document) {
                $rootScope.showAlert('Error', 'Por favor ingrese el numero de documento');
                return;
            }

            if (!$scope.users.phone) {
                $rootScope.showAlert('Error', 'Por favor ingrese el número celular');
                return;
            }

            if (!$scope.users.address) {
                $rootScope.showAlert('Error', 'Por favor ingrese la direccion');
                return;
            }

            if (!$scope.users.mail) {
                $rootScope.showAlert('Error', 'Por favor ingrese el mail');
                return;
            }

            if (!$scope.users.pass) {
                $rootScope.showAlert('Error', 'Por favor ingrese la constraseña');
                return;
            }

            if (!$scope.users.pass_confirm) {
                $rootScope.showAlert('Error', 'Por favor confirme la contraseña');
                return;
            }

            if ($scope.users.pass != $scope.users.pass_confirm) {
                $rootScope.showAlert('Error', 'Las contraseñas no coinciden');
                return;
            }

            if (!$scope.users.roles_id) {
                $rootScope.showAlert('Error', 'Por favor seleccione el rol del usuario');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var active = 0;
                    if (Number($scope.users.active)) {
                        active = 1;
                    }

                    var data = {
                        mail: $scope.users.mail,
                        pass: $scope.users.pass,
                        name: $scope.users.name,
                        last_name: $scope.users.last_name,
                        document: $scope.users.document,
                        phone: $scope.users.phone,
                        address: $scope.users.address,
                        active: active,
                        roles_id: $scope.users.roles_id
                    };

                    $rootScope.show();
                    $http.post($rootScope._host + 'users/create', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllUsers();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };
        // OBTENER todos los users
        $scope.getAllUsers = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'users/getAll')
                .success(function(data) {
                    $scope.userList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // ACTUALIZAR un users por id.
        $scope.updateUsers = function() {
            if (!$scope.users.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre');
                return;
            }

            if (!$scope.users.last_name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el apellido');
                return;
            }

            if (!$scope.users.document) {
                $rootScope.showAlert('Error', 'Por favor ingrese el numero de documento');
                return;
            }

            if (!$scope.users.phone) {
                $rootScope.showAlert('Error', 'Por favor ingrese el número celular');
                return;
            }

            if (!$scope.users.address) {
                $rootScope.showAlert('Error', 'Por favor ingrese la direccion');
                return;
            }

            if (!$scope.users.mail) {
                $rootScope.showAlert('Error', 'Por favor ingrese el mail');
                return;
            }

            if (!$scope.users.roles_id) {
                $rootScope.showAlert('Error', 'Por favor seleccione el rol del usuario');
                return;
            }

            if (!$scope.idRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione un usuario de la lista');
                return;
            }

            $rootScope.showConfirm('Actualizar', 'Desea actualizar el registro ?').then(function(res) {
                if (res) {
                	var active = 0;
                    if (Number($scope.users.active)) {
                        active = 1;
                    }
                    var data = {
                        id: $scope.idRegister,
                        mail: $scope.users.mail,
                        pass: $scope.users.pass,
                        name: $scope.users.name,
                        last_name: $scope.users.last_name,
                        document: $scope.users.document,
                        phone: $scope.users.phone,
                        address: $scope.users.address,
                        active: active,
                        roles_id: $scope.users.roles_id
                    };

                    $scope.controlDisabled = true;

                    $http.put($rootScope._host + 'users/update', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllUsers();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        $scope.gridClick = function(index) {
            $rootScope.showConfirm('Confirmación', 'Desea visualizar los datos del usuario?').then(function(res) {
                if (res) {
                    $scope.idCurrentIndex = index;
                    $scope.idRegister = $scope.userList[index].id;
                    $scope.users.name = $scope.userList[index].name;
                    $scope.users.last_name = $scope.userList[index].last_name;
                    $scope.users.document = $scope.userList[index].document;
                    $scope.users.phone = Number($scope.userList[index].phone);
                    $scope.users.address = $scope.userList[index].address;
                    $scope.users.mail = $scope.userList[index].mail;
                    $scope.users.roles_id = $scope.userList[index].roles_id;
                    if (Number($scope.userList[index].active)) {
                        $scope.users.active = true;
                    } else {
                        $scope.users.active = false;
                    }
                }
            });
        };
    })
