angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('adminMenu', {
                url: '/adminMenu',
                templateUrl: 'view/adminMenu.html',
                controller: 'adminMenu'
            });

        $stateProvider
            .state('configurationMenu', {
                url: '/configurationMenu',
                templateUrl: 'view/configurationMenu.html',
                controller: 'configurationMenu'
            });

        $stateProvider
            .state('configureGroups', {
                url: '/configureGroups',
                templateUrl: 'view/configureGroups.html',
                controller: 'configureGroups'
            });

        $stateProvider
            .state('configureInstitution', {
                url: '/configureInstitution',
                templateUrl: 'view/configureInstitution.html',
                controller: 'configureInstitution'
            });

        $stateProvider
            .state('configureRoutes', {
                url: '/configureRoutes',
                templateUrl: 'view/configureRoutes.html',
                controller: 'configureRoutes'
            });

        $stateProvider
            .state('configureStudents', {
                url: '/configureStudents',
                templateUrl: 'view/configureStudents.html',
                controller: 'configureStudents'
            });

        $stateProvider
            .state('configureUsers', {
                url: '/configureUsers',
                templateUrl: 'view/configureUsers.html',
                controller: 'configureUsers'
            });

        $stateProvider
            .state('documents', {
                url: '/documents',
                templateUrl: 'view/documents.html',
                controller: 'documents'
            });

        $stateProvider
            .state('launchPad', {
                url: '/launchPad',
                templateUrl: 'view/launchPad.html',
                controller: 'launchPad'
            });

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'view/login.html',
                controller: 'login'
            });

        $stateProvider
            .state('map', {
                url: '/map',
                templateUrl: 'view/map.html',
                controller: 'map'
            });

        $stateProvider
            .state('messageHistory', {
                url: '/messageHistory',
                templateUrl: 'view/messageHistory.html',
                controller: 'messageHistory'
            });

        $stateProvider
            .state('messageResponse', {
                url: '/messageResponse',
                templateUrl: 'view/messageResponse.html',
                controller: 'messageResponse'
            });

        $stateProvider
            .state('newMessage', {
                url: '/newMessage',
                templateUrl: 'view/newMessage.html',
                controller: 'newMessage'
            });

        $stateProvider
            .state('userInbox', {
                url: '/userInbox',
                templateUrl: 'view/userInbox.html',
                controller: 'userInbox'
            });

        $stateProvider
            .state('userInboxDetail', {
                url: '/userInboxDetail',
                templateUrl: 'view/userInboxDetail.html',
                controller: 'userInboxDetail'
            });

        $stateProvider
            .state('userForm', {
                url: '/userForm',
                templateUrl: 'view/userForm.html',
                controller: 'userForm'
            });

        $stateProvider
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: 'view/userProfile.html',
                controller: 'userProfile'
            });

        $urlRouterProvider.otherwise('/launchPad');
    })
