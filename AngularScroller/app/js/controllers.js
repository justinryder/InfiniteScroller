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
      var obstacle = new Obstacle(
        resourceObstacle,
        {x:Math.floor((Math.random()*Resources.gameScreenSize.width)), y:0},
        Resources.obstacleSpeeds[Math.floor((Math.random()*Resources.obstacleSpeeds.length))]);
      $scope.obstacles.push(obstacle);
    };
	$scope.moveBaby = function($event) {
		var minX = 104; 
		var maxX = 696; 
		return $event.pageX < minX+32 ? minX : $event.pageX > maxX ? maxX-32 : $event.pageX - 32;
	};

    setInterval(function(){
      $scope.$apply(function(){
        Enumerable.From($scope.obstacles).ForEach(function(obstacle){
          obstacle.update(Resources.gameSpeed / 1000);
        });
      })
    }, Resources.gameSpeed);
  }])
  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.highScores = [{name:'Bob', score:1234},{name:'Jill', score:4321}];
  }])
  .controller('CreditsCtrl', ['$scope', 'Resources', function($scope, Resources){
    $scope.credits = Resources.text.credits;
  }]);

function Obstacle(obstacle, position, speed) {
  var self = this;
  self.image = obstacle.image;
  self.size = obstacle.size;
  self.position = position;
  self.update = function(deltaTime){
    position.x += speed.x * deltaTime;
    position.y += speed.y * deltaTime;
  };
  return self;
}