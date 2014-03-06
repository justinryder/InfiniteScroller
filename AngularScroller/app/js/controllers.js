'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('MenuCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.gameName = Resources.text.gameName;
  }])
  .controller('GameCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.test = "game bitches";
    $scope.babyImage = Resources.images.baby;
  }])
  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.test = "high scores bitches";
  }]);