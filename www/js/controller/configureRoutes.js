angular.module('starter')
    .controller('configureRoutes', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.route = {};
        $scope.routeList = [];
        $scope.studentList = [];
        $scope.studentRouteList = [];
        $scope.idRouteCurrentIndex;
        $scope.idRouteRegister;
        $scope.idStudentCurrentIndex;
        $scope.idStudentRegister;

        $scope.init = function() {
            $scope.getAllRoutes();
            $scope.getAllStudent();
        };

        $scope.back = function() {
            $state.go("configurationMenu");
        };

        // OBTENER todos los users
        $scope.getAllStudent = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'student/getAll')
                .success(function(data) {
                    $scope.studentList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // CREAR un groups
        $scope.createRoutes = function() {
            if (!$scope.route.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre o número de la ruta');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var data = {
                        name: $scope.route.name,
                    };

                    $rootScope.show();
                    $http.post($rootScope._host + 'route/create', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllRoutes();
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
        $scope.deleteRoutes = function() {
            if (!$scope.idRouteRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione la ruta que desea eliminar');
                return;
            }

            if ($scope.routeList.length == 0) {
                $rootScope.showAlert('Error', 'No hay rutas registradas');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea eliminar la ruta ?').then(function(res) {
                if (res) {
                    $rootScope.show();
                    $http.delete($rootScope._host + 'route/delete/' + $scope.idRouteRegister)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllRoutes();
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
        $scope.getAllRoutes = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'route/getAll')
                .success(function(data) {
                    $scope.routeList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        $scope.gridRouteClick = function(index) {
            $scope.idRouteCurrentIndex = index;
            $scope.idRouteRegister = $scope.routeList[index].id;
            $scope.route.name = $scope.routeList[index].name;
            $scope.getRouteStudentById();
        }


        // CREAR un groups_users
        $scope.createRoute_student = function() {
            if (!$scope.idRouteRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione una ruta');
                return;
            }

            if (!$scope.route.student_id) {
                $rootScope.showAlert('Error', 'Por favor seleccione un estudiante');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var data = {
                        route_id: $scope.idRouteRegister,
                        student_id: $scope.route.student_id.id,
                        day: $scope.route.day
                    };

                    $rootScope.show();
                    $http.post($rootScope._host + 'route_student/create', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getRouteStudentById();
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
        $scope.deleteRoute_student = function() {
            if (!$scope.idStudentRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione el estudiante que desea eliminar');
                return;
            }

            if ($scope.studentRouteList.length == 0) {
                $rootScope.showAlert('Error', 'No hay estudiantes registrados en la ruta');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea eliminar el registro ?').then(function(res) {
                if (res) {
                    $rootScope.show();
                    $http.delete($rootScope._host + 'route_student/delete/' + $scope.idStudentRegister)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getRouteStudentById();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        }


        // OBTENER todos los usuarios de un grupo
        $scope.getRouteStudentById = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'route_student/routeStudent/' + $scope.idRouteRegister)
                .success(function(data) {
                    $scope.studentRouteList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $scope.studentRouteList = [];
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        $scope.gridStudentClick = function(index) {
            $scope.idStudentCurrentIndex = index;
            $scope.idStudentRegister = $scope.studentRouteList[index].id;
            for (var i = 0; i < $scope.studentList.length; i++) {
                if ($scope.studentList[i].id == $scope.studentRouteList[index].student_id) {
                    $scope.route.student_id = $scope.studentList[i];
                    break;
                }
            }
            $scope.route.day = $scope.studentRouteList[index].day;
        }
    })
