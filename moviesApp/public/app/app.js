var movieApp = angular.module('myapp', ['ngMaterial', 'ngMessages', 'ngRoute']);


movieApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '',
        controller: 'compoDemoCtrl'
    });
}])

    .controller('compoDemoCtrl', function ($scope) {
    });
