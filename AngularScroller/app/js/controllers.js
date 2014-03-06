'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('MenuCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.gameName = Resources.text.gameName;
    $scope.links = Resources.text.menuLinks;
  }])

  .controller('GameCtrl', ['$scope', '$document', 'Resources', function($scope, $document, Resources) {
    /* BABY */
    $scope.babyImage = Resources.images.babies[0];
    $scope.moveBaby = function($event) {
        var minX = 104;
        var maxX = 696;
        return $event.pageX < minX+32 ? minX : $event.pageX > maxX ? maxX-32 : $event.pageX - 32;
      };

    var babyImageIndex = 0;
    setInterval(function(){
      $scope.$apply(function(){
        babyImageIndex++;
        if (babyImageIndex > Resources.images.babies.length){
          babyImageIndex = 0;
        }
        $scope.babyImage = Resources.images.babies[babyImageIndex];
      });
    }, Resources.babyAnimateSpeed);

    /* OBSTACLES */
    $scope.obstacles = [];
    $scope.spawnObstacle = function() {
      var resourceObstacle = RandomItem(Resources.obstacles);
      var obstacle = new Obstacle(
        resourceObstacle,
        {x:Math.floor((Math.random()*Resources.gameScreenSize.width)), y:0},
        RandomItem(Resources.obstacleSpeeds));
      $scope.obstacles.push(obstacle);
    };

    function obstacleSpawnManager(){
      setTimeout(function(){
        $scope.$apply(function(){
          $scope.spawnObstacle();
        });
        obstacleSpawnManager();
      }, RandomItem(Resources.obstacleSpawnRates));
    }
    // init the obstacle spawnning random loop
    obstacleSpawnManager();

    /* UPDATE */
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

function RandomItem(arr){
  return arr[Random(arr.length)];
}

function Random(max, min){
  min = min || 0;
  return Math.floor((Math.random()*max)+min);
}

function Obstacle(obstacle, position, speed) {
  var self = this;
  self.image = obstacle.image;
  self.size = obstacle.size;
  self.position = position;
  self.update = function(deltaTime){
    position.y += speed * deltaTime;
  };
  return self;
}