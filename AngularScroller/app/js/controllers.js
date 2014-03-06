'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('MenuCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.gameName = Resources.text.gameName;
    $scope.links = Resources.text.menuLinks;
  }])

  .controller('GameCtrl', ['$scope', '$document', 'Resources', function($scope, $document, Resources) {
    /* SCORE */
    $scope.score = 0;

    /* FLOOR */
    $scope.floorImage = Resources.images.floor;
    $scope.floor = new Floor($scope.floorImage, { x: 0, y: 0 }, Resources.crawlSpeed);
    $scope.backgroundStyle = function(){
      return {
        'background-image': 'url(' + Resources.images.floor + ')',
        'background-position': $scope.floor.position.x + 'px ' + $scope.floor.position.y + 'px'
      };
    };

    /* BABY */
    $scope.babyImage = Resources.images.babies[0];
    $scope.babyPosition = {x:500,y:636};
    $scope.moveBaby = function($event) {
        var minX = Resources.floorLimit.min;
        var maxX = Resources.floorLimit.max;
        return $event.pageX < minX ? minX : $event.pageX > maxX ? maxX : $event.pageX;
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

    $scope.spawnAtSlot = function(it) {

        var resourceObstacle = RandomItem(Resources.obstacles);
        var obstacle = new Obstacle(
          resourceObstacle,
          {
            x: (it * 64) + (Resources.floorLimit.min + 96),
            y: -resourceObstacle.size.height
          },
          Resources.crawlSpeed
          );
        $scope.obstacles.push(obstacle);
    };

    $scope.spawnObstacleRow = function(min, max, gapWidth) {

      var gapStart = Random(max, min - gapWidth);
      var gapEnd = gapStart + gapWidth;

      for(var i = min; i < gapStart; i++) {
        $scope.spawnAtSlot(i);
      }
      for(var i = gapEnd; i < max; i++) {
        $scope.spawnAtSlot(i);
      }
    };

    var obstacleSpawnManagerInterval;
    function obstacleSpawnManager() {
      obstacleSpawnManagerInterval = setTimeout(function(){
        $scope.$apply(function(){
          $scope.spawnObstacleRow(0, 10, 2);
        });
        obstacleSpawnManager();
      }, RandomItem(Resources.obstacleSpawnRates));
    }
    // init the obstacle spawning random loop
    obstacleSpawnManager();

    /* UPDATE */
    var updateInterval = setInterval(function(){
      $scope.$apply(function(){
        var deltaTime = Resources.gameSpeed / 1000;

        $scope.floor.update(deltaTime);

        Enumerable.From($scope.obstacles).ForEach(function(obstacle){
          obstacle.update(deltaTime);
          if (AreColliding(obstacle.position, $scope.babyPosition)){
            $scope.endGame();
          }

          if (obstacle.position.y > Resources.gameScreenSize.height){
            $scope.obstacles.splice($scope.obstacles.indexOf(obstacle), 1);
          }
        });

        $scope.score += Resources.scoreSpeed;
      })
    }, Resources.gameSpeed);

    $scope.endGame = function(){
      clearInterval(updateInterval);
      if (obstacleSpawnManagerInterval){
        clearTimeout(obstacleSpawnManagerInterval);
      }
    };
  }])

  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.highScores = [{name:'Bob', score:1234},{name:'Jill', score:4321}];
  }])

  .controller('CreditsCtrl', ['$scope', 'Resources', function($scope, Resources){
    $scope.credits = Resources.text.credits;
  }]);

function AreColliding(pos1, pos2){
  return Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) < 128;
}

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
  self.style = function(){
    return {
      left: -position.x * 0.5,
      top: -position.y * 0.5
    };
  };
  return self;
}

function Floor(image, position, speed) {
  var self = this;
  self.image = image;
  self.position = position;
  self.speed = speed;
  self.update = function(deltaTime){
    position.y += speed * deltaTime;
  };
  return self;
}