angular.module('starter')
    .controller('userForm', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.studentList = [];
        $scope.student = {};
        $scope.idRegister;
        $scope.idCurrentIndex;

        $scope.init = function() {
            $scope.student = {};
            $scope.getAllStudent();
        };

        $scope.back = function() {
            $state.go("configurationMenu");
        };

        // CREAR un student
        $scope.createStudent = function() {
            if (!$scope.student.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre del estudiante');
                return;
            }

            if (!$scope.student.last_name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el apellido del estudiante');
                return;
            }

            if (!$scope.student.document) {
                $rootScope.showAlert('Error', 'Por favor ingrese el documento del estudiante');
                return;
            }

            if (!$scope.student.address) {
                $rootScope.showAlert('Error', 'Por favor ingrese la direccion del estudiante');
                return;
            }

            if (!$scope.student.current_grade) {
                $rootScope.showAlert('Error', 'Por favor ingrese el grado del estudiante');
                return;
            }

            $rootScope.showConfirm('Crear', 'Desea crear el registro ?').then(function(res) {
                if (res) {
                    var active = 0;
                    if (Number($scope.student.active)) {
                        active = 1;
                    }
                    var data = {
                        name: $scope.student.name,
                        last_name: $scope.student.last_name,
                        document: $scope.student.document,
                        address: $scope.student.address,
                        current_grade: $scope.student.current_grade,
                        active: active
                    };

                    $rootScope.show();
                    $http.post($rootScope._host + 'student/create', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllStudent();
                            $rootScope.showAlert('Exito', data.message);
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };
        // OBTENER todos los student
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

        // ACTUALIZAR un student por id.
        $scope.updateStudent = function() {
            if (!$scope.student.name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el nombre del estudiante');
                return;
            }

            if (!$scope.student.last_name) {
                $rootScope.showAlert('Error', 'Por favor ingrese el apellido del estudiante');
                return;
            }

            if (!$scope.student.document) {
                $rootScope.showAlert('Error', 'Por favor ingrese el documento del estudiante');
                return;
            }

            if (!$scope.student.address) {
                $rootScope.showAlert('Error', 'Por favor ingrese la direccion del estudiante');
                return;
            }

            if (!$scope.student.current_grade) {
                $rootScope.showAlert('Error', 'Por favor ingrese el grado del estudiante');
                return;
            }

            if (!$scope.idRegister) {
                $rootScope.showAlert('Error', 'Por favor seleccione un estudiante del listado');
                return;
            }

            $rootScope.showConfirm('Actualizar', 'Desea actualizar el registro ?').then(function(res) {
                if (res) {
                    var active = 0;
                    if (Number($scope.student.active)) {
                        active = 1;
                    }
                    var data = {
                        id: $scope.idRegister,
                        name: $scope.student.name,
                        last_name: $scope.student.last_name,
                        document: $scope.student.document,
                        address: $scope.student.address,
                        current_grade: $scope.student.current_grade,
                        active: active
                    };

                    $rootScope.show();
                    $http.put($rootScope._host + 'student/update', data)
                        .success(function(data) {
                            $rootScope.hide();
                            $scope.getAllStudent();
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
            $rootScope.showConfirm('Confirmación', 'Desea visualizar los datos del estudiante?').then(function(res) {
                if (res) {
                    $scope.idCurrentIndex = index;
                    $scope.idRegister = $scope.studentList[index].id;
                    $scope.student.name = $scope.studentList[index].name;
                    $scope.student.last_name = $scope.studentList[index].last_name;
                    $scope.student.document = $scope.studentList[index].document;
                    $scope.student.address = $scope.studentList[index].address;
                    $scope.student.current_grade = $scope.studentList[index].current_grade;
                    if (Number($scope.studentList[index].active)) {
                        $scope.student.active = true;
                    } else {
                        $scope.student.active = false;
                    }
                }
            });
        };
    })
