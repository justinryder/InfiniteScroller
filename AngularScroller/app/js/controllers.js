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

    /* BABY */
    $scope.babyImage = Resources.images.babies[0];
    $scope.babyPosition = {x:0,y:636};
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
        {x:Random(Resources.gameScreenSize.width), y:-resourceObstacle.size.height},
        Resources.crawlSpeed);
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

          if (AreColliding(obstacle.position, $scope.babyPosition)){
            alert('YOU HAVE FUCKED UP NOW!')
          }

          if (obstacle.position.y > Resources.gameScreenSize.height){
            $scope.obstacles.splice($scope.obstacles.indexOf(obstacle), 1);
          }
        });

        $scope.score += Resources.scoreSpeed;
      })
    }, Resources.gameSpeed);
  }])

  .controller('HighScoresCtrl', ['$scope', function($scope){
    $scope.highScores = [{name:'Bob', score:1234},{name:'Jill', score:4321}];
  }])

  .controller('CreditsCtrl', ['$scope', 'Resources', function($scope, Resources){
    $scope.credits = Resources.text.credits;
  }]);

function AreColliding(pos1, pos2){
  return Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) < 64;
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
  return self;
}