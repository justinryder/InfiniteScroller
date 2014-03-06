'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('MenuCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.gameName = Resources.text.gameName;
    $scope.links = Resources.text.menuLinks;
  }])
  .controller('GameCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.babyImage = Resources.images.baby;

  }])
  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.highScores = [{name:'Bob', score:1234},{name:'Jill', score:4321}];
  }])
  .controller('CreditsCtrl', ['$scope', 'Resources', function($scope, Resources){
    $scope.credits = Resources.text.credits;
  }]);