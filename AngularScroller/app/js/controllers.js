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
      var resourceObstacle = Resources.obstacles[Math.floor((Math.random()*Resources.obstacles.length))];
      var obstacle = new Obstacle(resourceObstacle, {x:Math.floor((Math.random()*Resources.gameScreenSize.width)), y:Math.floor((Math.random()*Resources.gameScreenSize.height))});
      $scope.obstacles.push(obstacle);
    };
	$scope.moveBaby = function($event) {
		var minX = 104; 
		var maxX = 696; 
		return $event.pageX < minX+32 ? minX : $event.pageX > maxX ? maxX-32 : $event.pageX - 32;
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