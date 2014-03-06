angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MainMenuController',
        templateUrl: 'Partials/MainMenu'
      })
      .when('/game', {
        controller: 'GameController',
        templateUrl: 'Partials/Game'
      })
      .otherwise({
        redirectTo: '/'
      });
    })
  .controller('MainMenuController', function($scope) {
    $scope.foo = 'main menu';
  })
  .controller('GameController', function($scope) {
    $scope.foo = 'game';
  });