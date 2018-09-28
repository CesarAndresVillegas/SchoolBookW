angular.module('starter')
    .controller('newMessage', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService, $window) {
        $scope.message = {};
        $scope.messagesTypeList = [];
        $scope.groupList = [];
        $scope.userList = [];
        $scope.repositoryList = [];
        $scope.sendList = [];
        $scope.userGroupList = [];

        $scope.init = function() {
            $scope.getAllMessagesTypeList();
            $scope.getAllGroupsList();
            $scope.getAllUsersList();
            $scope.getAllRepositoryList();
        };

        $scope.back = function() {
            if (SharedService.backScreen == "messageHistory") {
                $state.go("messageHistory");
            } else if (SharedService.backScreen == "userInbox") {
                $state.go("userInbox");
            } else {
                $state.go("adminMenu");
            }
        };

        document.getElementById("uploadBtn").onchange = function() {
            document.getElementById("uploadFile").value = this.value;
        };

        // OBTENER todos los tipos de mensaje
        $scope.getAllMessagesTypeList = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'messages_type/getAll')
                .success(function(data) {
                    $scope.messagesTypeList = data.data;
                    if (SharedService.backScreen == "userInbox" || SharedService.backScreen == "messageHistory") {
                        $scope.message.subjet = "Re: " + SharedService.selectedMessage.subjet;
                        $scope.message.text = "-" + SharedService.selectedMessage.text;
                        var userObject = {
                            users_id: SharedService.selectedMessage.id,
                            name: SharedService.selectedMessage.remitente
                        }
                        $scope.sendList.push(userObject);

                        for (var i = 0; i < $scope.messagesTypeList.length; i++) {
                            if ($scope.messagesTypeList[i].id = SharedService.selectedMessage.messages_type_id) {
                                $scope.message.category = $scope.messagesTypeList[i];
                                break;
                            }
                        }
                    }
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // OBTENER todos los grupos
        $scope.getAllGroupsList = function() {
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

        // OBTENER todos los grupos
        $scope.getAllUsersList = function() {
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

        // OBTENER todos los grupos
        $scope.getAllRepositoryList = function() {
            $rootScope.show();
            $http.get($rootScope._host + 'repository/getAll')
                .success(function(data) {
                    $scope.repositoryList = data.data;
                    $rootScope.hide();
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        // CREAR un messages
        $scope.createMessages = function() {
            if (!$scope.message.subjet) {
                $rootScope.showAlert('Error', 'Igrese el asunto del mensaje el mensaje');
                return;
            }

            if (!$scope.message.category) {
                $rootScope.showAlert('Error', 'Seleccione la categoria a la que pertenece el mensaje');
                return;
            }

            if (!$scope.sendList.length) {
                $rootScope.showAlert('Error', 'No ha seleccionado ningun destinatario');
                return;
            }

            if (!$scope.message.text) {
                if ($scope.message.repository === undefined) {
                    $rootScope.showAlert('Error', 'No ha seleccionado ningun repositorio y no ha escrito ningun texto, imposible enviar');
                    return;
                }
            }

            $rootScope.showConfirm('Enviar', 'Desea enviar el mensaje?').then(function(res) {
                if (res) {
                    var idMessage;
                    $rootScope.show();
                    var repositorySelected = "";
                    if ($scope.message.repository) {
                        repositorySelected = $scope.message.repository.id;
                    }

                    var fd = new FormData();

                    try {
                        var fileUploaded = angular.element(document.querySelector('#uploadBtn'));
                        fd.append('attach', fileUploaded[0].files[0]);
                    } catch (ex) {
                        fd.append('attach', "");
                    }

                    fd.append("messages_type_id", $scope.message.category.id);
                    fd.append("repository_id", repositorySelected);
                    fd.append("text", $scope.message.text);
                    fd.append("users_id", SharedService.userData.id);
                    fd.append("subjet", $scope.message.subjet);
                    $http.post($rootScope._host + 'messages/create', fd, {
                            withCredentials: false,
                            headers: {
                                'Content-Type': undefined
                            },
                            transformRequest: angular.identity
                        })
                        .success(function(data) {
                            idMessage = data.id;
                            var data = {
                                messages_id: idMessage,
                                users_group: $scope.sendList,
                            };
                            $http.post($rootScope._host + 'messages_users/createArray', data)
                                .success(function(data) {
                                    $scope.message = {};
                                    $scope.sendList = [];
                                    $rootScope.hide();
                                    $rootScope.showAlert('Exito', data.message);
                                })
                                .error(function(data) {
                                            $http.delete($rootScope._host + 'messages/delete/' + idMessage)
                                                .success(function(data) {
                                                    $rootScope.showAlert('ERROR', 'Ha ocurrido un error en el proceso');
                                                    $rootScope.hide();
                                                });
                                });
                        })
                        .error(function(data) {
                            $rootScope.hide();
                            $rootScope.showAlert('Ha ocurrido un error', data.message);
                        });
                }
            });
        };

        // Agregar un usuario
        $scope.addSingleUser = function() {
            var flag = false;

            if (!$scope.message.users) {
                $rootScope.showAlert('Error', 'Por favor seleccione un usuario');
                return;
            }

            for (var i = 0; i < $scope.sendList.length; i++) {
                if ($scope.sendList[i].users_id == $scope.message.users.id) {
                    flag = true;
                    break;
                }
            }

            if (flag) {
                return;
            } else {
                var userObject = {
                    users_id: $scope.message.users.id,
                    name: $scope.message.users.name
                }
                $scope.sendList.push(userObject);
            }
        };

        // Agregar usuarios de un grupo
        $scope.addGroupUser = function() {
            var flag = false;

            if (!$scope.message.groups) {
                $rootScope.showAlert('Error', 'Por favor seleccione un grupo');
                return;
            }

            $rootScope.show();
            $http.get($rootScope._host + 'groups_users/groupUsers/' + $scope.message.groups.id)
                .success(function(data) {
                    $scope.userGroupList = data.data;
                    $rootScope.hide();
                    for (var i = 0; i < $scope.userGroupList.length; i++) {
                        flag = false;
                        for (var j = 0; j < $scope.sendList.length; j++) {
                            if ($scope.sendList[j].users_id == $scope.userGroupList[i].users_id) {
                                flag = true;
                                break;
                            }
                        }

                        if (!flag) {
                            var userObject = {
                                users_id: $scope.userGroupList[i].users_id,
                                name: $scope.userGroupList[i].name
                            }
                            $scope.sendList.push(userObject);
                        }
                    }
                })
                .error(function(data) {
                    $rootScope.hide();
                    $rootScope.showAlert('Ha ocurrido un error', data.message);
                });
        };

        $scope.delete = function(index) {
            $scope.sendList.splice(index, index);
        }
    })
