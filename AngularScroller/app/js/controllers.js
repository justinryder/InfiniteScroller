'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MenuCtrl', ['$scope', function($scope) {
    $scope.gameName = 'Baby Boomer';
  }])
  .controller('GameCtrl', ['$scope', function($scope) {
    $scope.test = "game bitches";
    $scope.gameScreen = "Game Screen";
  }])
  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.test = "high scores bitches";
  }]);