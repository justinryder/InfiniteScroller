'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/menu', {templateUrl: 'partials/menu.html', controller: 'MenuCtrl'});
  $routeProvider.when('/game', {templateUrl: 'partials/game.html', controller: 'GameCtrl'});
  $routeProvider.otherwise({redirectTo: '/menu'});
}]);