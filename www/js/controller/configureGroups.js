angular.module('starter')
    .controller('configureGroups', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.route = {};
        $scope.routeList = [];
        $scope.userList = [];
        $scope.userGroupList = [];
        $scope.groups_users = {};
        $scope.idGroupCurrentIndex;
        $scope.idGroupRegister;
        $scope.idUserCurrentIndex;
        $scope.idUserRegister;
        $scope.group = {};

        $scope.init = function() {
            $scope.getAllGroups();
            $scope.getAllUsers();
        };

        $scope.back = function() {
            $state.go("configurationMenu");
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

        // CREAR un groups
        $scope.createGroups = function() {
            if (!$scope.group.group) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre del grupo');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var data = {
                        name: $scope.group.group,
                    };

                    $rootScope.show();
                    $http.post($rootScope._host + 'groups/create', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllGroups();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        // BORRAR un groups
        $scope.deleteGroups = function() {
            if (!$scope.idGroupRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione el grupo que desea eliminar');
                return;
            }

            if ($scope.groupList.length == 0) {
                $rootScope.showAlert('Error', 'No hay grupos registrados');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea eliminar el registro ?').then(function(res) {
                if (res) {
                    $rootScope.show();
                    $http.delete($rootScope._host + 'groups/delete/' + $scope.idGroupRegister)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllGroups();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        // OBTENER todos los groups
        $scope.getAllGroups = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'groups/getAll')
                .success(function(data) {
                    $scope.groupList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        $scope.gridGroupClick = function(index) {
            $scope.idGroupCurrentIndex = index;
            $scope.idGroupRegister = $scope.groupList[index].id;
            $scope.group.group = $scope.groupList[index].name;
            $scope.getGroupUsersById();
        }


        // CREAR un groups_users
        $scope.createGroups_users = function() {
            if (!$scope.idGroupRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione un grupo');
                return;
            }

            if (!$scope.group.users_id) {
                $rootScope.showAlert('Error', 'Por favor seleccione un usuario');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var data = {
                        groups_id: $scope.idGroupRegister,
                        users_id: $scope.group.users_id.id
                    };

                    $rootScope.show();
                    $http.post($rootScope._host + 'groups_users/create', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getGroupUsersById();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        // BORRAR un groups_users
        $scope.deleteGroups_users = function() {
            if (!$scope.idUserRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione el usuario que desea eliminar');
                return;
            }

            if ($scope.userGroupList.length == 0) {
                $rootScope.showAlert('Error', 'No hay usuarios registrados en el grupo');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea eliminar el registro ?').then(function(res) {
                if (res) {
                    $rootScope.show();
                    $http.delete($rootScope._host + 'groups_users/delete/' + $scope.idUserRegister)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getGroupUsersById();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        }


        // OBTENER todos los groups_users
        $scope.getAllGroups_users = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'groups_users/getAll')
                .success(function(data) {
                    $scope.userGroupList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // OBTENER todos los usuarios de un grupo
        $scope.getGroupUsersById = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'groups_users/groupUsers/' + $scope.idGroupRegister)
                .success(function(data) {
                    $scope.userGroupList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $scope.userGroupList = [];
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        $scope.gridUserClick = function(index) {
            $scope.idUserCurrentIndex = index;
            $scope.idUserRegister = $scope.userGroupList[index].id;
            for (var i = 0; i < $scope.userList.length; i++) {
                if ($scope.userList[i].id == $scope.userGroupList[index].users_id) {
                    $scope.group.users_id = $scope.userList[i];
                    break;
                }
            }
        }
    })
