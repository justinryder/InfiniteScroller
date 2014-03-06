'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('MenuCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.gameName = Resources.text.gameName;
    $scope.links = Resources.text.menuLinks;
  }])
  .controller('GameCtrl', ['$scope', '$document', 'Resources', function($scope, $document, Resources) {
    $scope.babyImage = Resources.images.baby;
    $scope.obstacles = [];
    $scope.spawnObstacle = function() {
      console.log('spawning obstacle');
      var resourceObstacle = Resources.obstacles[Math.floor((Math.random()*Resources.obstacles.length))];
      var obstacle = new Obstacle(resourceObstacle, {x:Math.floor((Math.random()*100)), y:Math.floor((Math.random()*100))});
      $scope.obstacles.push(obstacle);
    };
  }])
  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.highScores = [{name:'Bob', score:1234},{name:'Jill', score:4321}];
  }])
  .controller('CreditsCtrl', ['$scope', 'Resources', function($scope, Resources){
    $scope.credits = Resources.text.credits;
  }]);

function Obstacle(obstacle, position) {
  return {
    image: obstacle.image,
    size: obstacle.size,
    position: position
  };
}